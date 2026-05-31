-- ============================================================
-- Security hardening — 2026-05-31
-- ============================================================

-- 1. Remove anon INSERT on affiliate_clicks
--    The API route already uses service_role (admin client).
--    This policy lets anyone with the anon key bypass rate limits and spam clicks.
DROP POLICY IF EXISTS "clicks_insert_only" ON public.affiliate_clicks;

-- Add explicit SELECT deny (belt-and-suspenders — RLS no-policy already denies)
CREATE POLICY "clicks_no_public_access"
  ON public.affiliate_clicks FOR ALL USING (false) WITH CHECK (false);

-- 2. Harden set_updated_at() against search_path injection
--    Without SET search_path='', a malicious actor with public schema write
--    access could shadow pg_catalog functions.
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = pg_catalog.now();
  RETURN NEW;
END;
$$;
