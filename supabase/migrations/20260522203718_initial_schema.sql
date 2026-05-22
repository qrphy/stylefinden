-- ============================================================
-- Stylefinden — Affiliate Product Catalog
-- Migration: initial_schema
-- ============================================================

-- ─────────────────────────────────────────
-- 1. PIECES (ürün kataloğu)
-- ─────────────────────────────────────────
CREATE TABLE pieces (
  id                uuid        PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Temel bilgiler
  title             text        NOT NULL,
  brand             text,
  merchant_name     text,                          -- "ZARA", "ASOS", "H&M"

  -- Awin entegrasyonu
  awin_product_id   text        UNIQUE,            -- Awin feed product ID
  awin_merchant_id  text,                          -- Awin advertiser ID

  -- Kategori & benzerlik
  category          text        NOT NULL,          -- top, bottom, dress, shoes, bag, outerwear, jewelry, accessory
  subcategory       text,                          -- t-shirt, jeans, ankle-boot, crossbody...
  color             text,                          -- spesifik renk adı ("olive green")
  color_family      text        NOT NULL,          -- black, white, neutral, blue, red, green, pink, brown
  tags              text[]      NOT NULL DEFAULT '{}',

  -- Fiyat
  price             decimal(10,2),                 -- Awin feed'den gelen güncel fiyat
  price_range       text GENERATED ALWAYS AS (
    CASE
      WHEN price IS NULL    THEN NULL
      WHEN price < 50       THEN 'budget'
      WHEN price < 200      THEN 'mid'
      ELSE                       'luxury'
    END
  ) STORED,
  currency          text        NOT NULL DEFAULT 'GBP',

  -- Affiliate
  affiliate_url     text        NOT NULL,          -- Awin deep link
  image_url         text,

  -- Durum
  active            boolean     NOT NULL DEFAULT true,
  feed_updated_at   timestamptz,                   -- son Awin feed sync zamanı
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

-- ─────────────────────────────────────────
-- 2. OUTFITS (Sanity köprüsü + similarity metadata)
-- ─────────────────────────────────────────
CREATE TABLE outfits (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  sanity_id      text        UNIQUE NOT NULL,      -- Sanity doküman _id
  slug           text        UNIQUE NOT NULL,

  -- Sanity'deki editorial alanların mirror'ı (similarity sorguları için)
  style          text[]      NOT NULL DEFAULT '{}',    -- casual, formal, streetwear
  season         text[]      NOT NULL DEFAULT '{}',    -- spring, summer, fall, winter
  occasion       text[]      NOT NULL DEFAULT '{}',    -- work, date, brunch, party
  color_palette  text[]      NOT NULL DEFAULT '{}',    -- dominant renk aileleri

  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

-- ─────────────────────────────────────────
-- 3. OUTFIT_PIECES (junction)
-- ─────────────────────────────────────────
CREATE TABLE outfit_pieces (
  id         uuid     PRIMARY KEY DEFAULT gen_random_uuid(),
  outfit_id  uuid     NOT NULL REFERENCES outfits(id)  ON DELETE CASCADE,
  piece_id   uuid     NOT NULL REFERENCES pieces(id)   ON DELETE CASCADE,
  position   smallint NOT NULL DEFAULT 0,
  is_hero    boolean  NOT NULL DEFAULT false,

  UNIQUE(outfit_id, piece_id)
);

-- ─────────────────────────────────────────
-- 4. AFFILIATE_CLICKS (tıklama takibi)
-- ─────────────────────────────────────────
CREATE TABLE affiliate_clicks (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  piece_id        uuid        NOT NULL REFERENCES pieces(id),
  outfit_id       uuid        REFERENCES outfits(id),

  -- Awin clickref formatı: "outfit_{sanity_id}__piece_{piece_id}"
  awin_clickref   text,

  -- Privacy
  ip_hash         text,
  user_agent      text,
  referrer        text,

  clicked_at      timestamptz NOT NULL DEFAULT now()
);

-- ─────────────────────────────────────────
-- 5. PRICE_HISTORY (Awin feed fiyat geçmişi)
-- ─────────────────────────────────────────
CREATE TABLE price_history (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  piece_id    uuid        NOT NULL REFERENCES pieces(id) ON DELETE CASCADE,
  price       decimal(10,2) NOT NULL,
  currency    text        NOT NULL DEFAULT 'GBP',
  available   boolean     NOT NULL DEFAULT true,
  scraped_at  timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- İNDEKSLER
-- ============================================================

-- Outfit similarity (GIN — array overlap sorguları için)
CREATE INDEX idx_outfits_style     ON outfits USING GIN(style);
CREATE INDEX idx_outfits_occasion  ON outfits USING GIN(occasion);
CREATE INDEX idx_outfits_season    ON outfits USING GIN(season);
CREATE INDEX idx_outfits_palette   ON outfits USING GIN(color_palette);

-- Piece similarity
CREATE INDEX idx_pieces_category   ON pieces(category);
CREATE INDEX idx_pieces_color_fam  ON pieces(color_family);
CREATE INDEX idx_pieces_tags       ON pieces USING GIN(tags);
CREATE INDEX idx_pieces_active     ON pieces(active) WHERE active = true;

-- Awin feed sync
CREATE INDEX idx_pieces_awin_mid   ON pieces(awin_merchant_id);

-- Analytics
CREATE INDEX idx_clicks_piece      ON affiliate_clicks(piece_id);
CREATE INDEX idx_clicks_outfit     ON affiliate_clicks(outfit_id);
CREATE INDEX idx_clicks_at         ON affiliate_clicks(clicked_at DESC);

-- Price history
CREATE INDEX idx_price_piece       ON price_history(piece_id);
CREATE INDEX idx_price_scraped     ON price_history(scraped_at DESC);

-- Junction
CREATE INDEX idx_op_outfit         ON outfit_pieces(outfit_id);
CREATE INDEX idx_op_piece          ON outfit_pieces(piece_id);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_pieces_updated_at
  BEFORE UPDATE ON pieces
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_outfits_updated_at
  BEFORE UPDATE ON outfits
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- VIEWS
-- ============================================================

-- Piece başına tıklama sayısı
CREATE VIEW piece_click_counts AS
SELECT
  piece_id,
  COUNT(*)                                                               AS total_clicks,
  COUNT(*) FILTER (WHERE clicked_at > now() - interval '7 days')        AS clicks_last_7d,
  COUNT(*) FILTER (WHERE clicked_at > now() - interval '30 days')       AS clicks_last_30d
FROM affiliate_clicks
GROUP BY piece_id;

-- Outfit performance özeti
CREATE VIEW outfit_click_summary AS
SELECT
  o.id,
  o.sanity_id,
  o.slug,
  COUNT(ac.id)                                                           AS total_clicks,
  COUNT(DISTINCT ac.piece_id)                                            AS unique_pieces_clicked,
  COUNT(ac.id) FILTER (WHERE ac.clicked_at > now() - interval '7 days') AS clicks_last_7d
FROM outfits o
LEFT JOIN affiliate_clicks ac ON ac.outfit_id = o.id
GROUP BY o.id, o.sanity_id, o.slug;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE pieces           ENABLE ROW LEVEL SECURITY;
ALTER TABLE outfits          ENABLE ROW LEVEL SECURITY;
ALTER TABLE outfit_pieces    ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_history    ENABLE ROW LEVEL SECURITY;

-- Public read (site herkese açık)
CREATE POLICY "pieces_public_read"
  ON pieces FOR SELECT USING (active = true);

CREATE POLICY "outfits_public_read"
  ON outfits FOR SELECT USING (true);

CREATE POLICY "outfit_pieces_public_read"
  ON outfit_pieces FOR SELECT USING (true);

-- affiliate_clicks: sadece insert (ziyaretçi yazar, okuyamaz)
CREATE POLICY "clicks_insert_only"
  ON affiliate_clicks FOR INSERT WITH CHECK (true);

-- price_history: service role dışı erişim yok
CREATE POLICY "price_history_deny_public"
  ON price_history FOR SELECT USING (false);
