/**
 * Cute & Coquette Outfits — Sanity Upload Script
 *
 * Kullanım:
 *   SANITY_API_TOKEN=sk-... node scripts/upload-cute-coquette-outfits.mjs
 *
 * Token alımı: sanity.io/manage → proje 29dp442n → API → Tokens → Add API Token (Editor)
 */

import { createClient } from '@sanity/client'
import { createReadStream, existsSync } from 'fs'
import { extname, basename } from 'path'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const PROJECT_ID = '29dp442n'
const DATASET = 'production'
const API_VERSION = '2024-01-01'

const token = process.env.SANITY_API_TOKEN
if (!token) {
  console.error('❌  SANITY_API_TOKEN eksik.')
  console.error('   sanity.io/manage → proje 29dp442n → API → Tokens → Add API Token (Editor)')
  console.error('   Sonra:  SANITY_API_TOKEN=sk-... node scripts/upload-cute-coquette-outfits.mjs')
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  token,
  useCdn: false,
})

const BASE = '/Users/furkan/Downloads/Cute&Coquette and Retro&Vintage Outfits/Cute&Coquette Outfits'

// ─── Outfit tanımları ────────────────────────────────────────────────────────
const OUTFITS = [
  {
    folder: 'Yeni klasör - Kopya - Kopya',
    title: 'Pink Lace Bow Crop & Pleated Mini',
    slug: 'pink-lace-bow-crop-pleated-mini',
    description: 'A sweet and feminine pink coquette look featuring a delicate lace bow crop top paired with a box-pleated mini skirt. Finished with ballet-inspired satin ankle-tie heels for an ultra-femme, balletcore touch.',
    style: 'cute-coquette',
    season: 'spring',
    occasion: 'casual',
    occasions: ['date-night'],
    tags: ['lace', 'pink', 'pleated skirt', 'bow', 'coquette', 'balletcore', 'crop top', 'mini skirt'],
    mainImage: 'fashn-export-1779708340886.webp',
    mainImageAlt: 'Pink lace bow crop top with pleated mini skirt and satin ballet heels',
    pieces: [
      { file: '71ooKhwvNuL._AC_SX569_.jpg',        name: 'Pink Lace Bow Crop Top',              type: 'top',    colorTag: 'pink',  itemTag: 'blouse',   description: 'Square neckline, bow tie, ruffle hem, pink lace' },
      { file: 'Ekran görüntüsü 2026-05-25 052809.png', name: 'Pink Box Pleat Mini Skirt',       type: 'bottom', colorTag: 'pink',  itemTag: 'skirt',    description: 'Box pleat mini, baby pink, high waist' },
      { file: 'STEVEMADDEN_SHOES_LARINA_PINK-SATIN.webp', name: 'Steve Madden Larina Pink Satin Ballet Heels', type: 'shoes', colorTag: 'pink', itemTag: 'heels', description: 'Steve Madden Larina, pink satin, ankle-tie ballet heel' },
    ],
  },
  {
    folder: 'Yeni klasör - Kopya (2)',
    title: 'Pink Eyelet Ruffle Cami & Bow Mini',
    slug: 'pink-eyelet-ruffle-cami-bow-mini',
    description: 'Dreamy summer-ready coquette with a flutter-sleeve eyelet ruffle cami in blush pink, paired with a bow-detail mini skirt and kitten heel bow mules. Light, airy, and effortlessly feminine.',
    style: 'cute-coquette',
    season: 'summer',
    occasion: 'casual',
    occasions: ['date-night'],
    tags: ['eyelet', 'ruffle', 'cami', 'bow', 'pink', 'coquette', 'kitten heel', 'summer'],
    mainImage: 'fashn-export-1779708454814.webp',
    mainImageAlt: 'Pink eyelet ruffle cami with bow mini skirt and kitten heel mules',
    pieces: [
      { file: '0-modelinfo-kiana-us2_18eb0886-608d-479d-b43d-3b65b07f9137.webp', name: 'Pink Eyelet Flutter Sleeve Cami', type: 'top', colorTag: 'pink', itemTag: 'blouse', description: 'Flutter sleeve, eyelet lace, ruffle hem, blush pink' },
      { file: '4fa0f5cb-b80d-4124-a927-4b96f6b0fcfd.webp', name: 'Pink Bow Detail Mini Skirt', type: 'bottom', colorTag: 'pink', itemTag: 'skirt', description: 'Bow detail mini, soft pink, coquette' },
      { file: '31200118_fpx.webp', name: 'Pink Bow Kitten Heel Mule', type: 'shoes', colorTag: 'pink', itemTag: 'heels', description: 'Bow detail kitten mule, strappy, blush pink' },
    ],
  },
  {
    folder: 'Yeni klasör - Kopya (3)',
    title: 'Pink Shirt & Ivory Pleated Tennis Mini',
    slug: 'pink-shirt-ivory-pleated-tennis-mini',
    description: 'A fresh preppy-coquette take with a fitted pink short-sleeve button-up shirt tucked into a crisp ivory pleated mini skirt. Strappy pink heels add a romantic finishing touch to this chic everyday look.',
    style: 'cute-coquette',
    season: 'spring',
    occasion: 'casual',
    occasions: ['school'],
    tags: ['button-up', 'pink shirt', 'pleated', 'ivory', 'preppy', 'coquette', 'tennis mini'],
    mainImage: 'fashn-export-1779708745929.webp',
    mainImageAlt: 'Pink fitted button-up shirt with ivory pleated mini skirt and strappy heels',
    pieces: [
      { file: '0-modelinfo-summer-us2_2c06d0ee-e8f9-4403-a677-a761a72ca8b7.webp', name: 'Pink Fitted Short-Sleeve Button-Up Shirt', type: 'top', colorTag: 'pink', itemTag: 'shirt', description: 'Fitted short-sleeve button-up, blush pink' },
      { file: '25348490_57298442_1000.webp', name: 'Ivory High-Waist Pleated Mini Skirt', type: 'bottom', colorTag: 'beige', itemTag: 'skirt', description: 'High-waist pleated mini, ivory cream' },
      { file: 'fe535c25-54c2-4588-9500-b651d33b5f0d.webp', name: 'Pink Strappy Kitten Heel Sandals', type: 'shoes', colorTag: 'pink', itemTag: 'heels', description: 'Strappy kitten heel sandals, blush pink' },
    ],
  },
  {
    folder: 'Yeni klasör - Kopya (4)',
    title: 'Pink Linen Corset Crop & Tiered Ruffle Skirt',
    slug: 'pink-linen-corset-crop-tiered-ruffle-skirt',
    description: 'A breezy summer coquette set with a pink linen corset crop top and a dreamy layered tiered ruffle mini skirt. Adidas Gazelle sneakers add a sporty-cute twist to this feminine look.',
    style: 'cute-coquette',
    season: 'summer',
    occasion: 'casual',
    occasions: ['date-night'],
    tags: ['corset top', 'tiered skirt', 'ruffle', 'pink', 'coquette', 'Adidas Gazelle', 'summer', 'linen'],
    mainImage: 'fashn-export-1779708868977.webp',
    mainImageAlt: 'Pink corset crop top with tiered ruffle mini skirt and Adidas Gazelle sneakers',
    pieces: [
      { file: '1-modelinfo-jenaya-us2_97d6b0fd-baf9-4212-8d15-72f34ec4b25f.jpg', name: 'Pink Linen Corset Crop Top', type: 'top', colorTag: 'pink', itemTag: 'blouse', description: 'Hook-closure corset crop, linen blend, blush pink' },
      { file: '1-modelinfo-jenaya-us2_d328f181-7264-48a4-b670-fd619a342606.webp', name: 'Pink Layered Tiered Ruffle Mini Skirt', type: 'bottom', colorTag: 'pink', itemTag: 'skirt', description: 'Tiered ruffle mini, layered, light pink' },
      { file: 'Gazelle_Indoor_Shoes_Pink_IH5484_01_standard.avif', name: 'Adidas Gazelle Indoor Pink Sneakers', type: 'shoes', colorTag: 'pink', itemTag: 'sneakers', description: 'Adidas Gazelle Indoor, soft pink, suede upper' },
    ],
  },
  {
    folder: 'Yeni klasör - Kopya (5)',
    title: 'Pink Puff Sleeve Corset Top & Fairycore Ruffle Skirt',
    slug: 'pink-puff-sleeve-corset-fairycore-ruffle-skirt',
    description: 'An ethereal fairycore-coquette look with a pink puff-sleeve corset top with lace trim and a dreamy tiered lace patchwork ruffle mini skirt. Platform bow sandals complete this romantic, whimsical ensemble.',
    style: 'cute-coquette',
    season: 'spring',
    occasion: 'date-night',
    occasions: ['casual', 'party-night-out'],
    tags: ['puff sleeve', 'corset', 'fairycore', 'lace', 'pink', 'coquette', 'platform heels', 'ruffle skirt'],
    mainImage: 'fashn-export-1779723921160.webp',
    mainImageAlt: 'Pink puff sleeve corset top with fairycore lace ruffle skirt and platform heels',
    pieces: [
      { file: '2f290804-fd70-45db-b3c0-333c23e9e6c0.webp', name: 'Pink Puff Sleeve Lace Corset Top', type: 'top', colorTag: 'pink', itemTag: 'blouse', description: 'Puff sleeve, lace trim, corset-style bodice, blush pink' },
      { file: 'Women-Y2k-Mini-Skirt-Summer-Fairycore-High-Waist-Lace-Patchwork-Ruched-Ruffle-Skirt-for-Teen-Girls_7efe99cb-7120-461f-bc79-86fb4e03a3b2.8bc7b42337e6fc19ee2c8f3ec9222b9.jpg', name: 'Pink Fairycore Lace Patchwork Ruffle Mini Skirt', type: 'bottom', colorTag: 'pink', itemTag: 'skirt', description: 'Lace patchwork ruched ruffle, fairycore, high waist' },
      { file: '22965329_fpx.webp', name: 'Pink Platform Block Heel Bow Sandals', type: 'shoes', colorTag: 'pink', itemTag: 'heels', description: 'Platform block heel, tulle bow, ankle strap, blush' },
    ],
  },
  {
    folder: 'Yeni klasör - Kopya (6)',
    title: 'Cottagecore Rose Floral Mini Dress',
    slug: 'cottagecore-rose-floral-mini-dress',
    description: 'A charming cottagecore-coquette look centered around a gorgeous pink rose floral corset mini dress with lace trim. Paired with Steve Madden Darcey wine patent Mary Jane heels and white socks for a playful vintage touch.',
    style: 'cute-coquette',
    season: 'spring',
    occasion: 'casual',
    occasions: ['date-night'],
    tags: ['floral', 'rose', 'cottagecore', 'mini dress', 'coquette', 'Mary Jane', 'white socks', 'corset dress'],
    mainImage: 'fashn-export-1779724039356.webp',
    mainImageAlt: 'Pink rose floral corset mini dress with wine Mary Jane heels and white socks',
    pieces: [
      { file: '71sJ0NuhttL._AC_SX569_.jpg', name: 'Pink Rose Floral Corset Mini Dress', type: 'dress', colorTag: 'pink', itemTag: 'dress', description: 'Square neck, corset boning, rose floral print, lace trim' },
      { file: 'STEVEMADDEN_SHOES_DARCEY_WINE-PAT_2480.webp', name: 'Steve Madden Darcey Wine Patent Heels', type: 'shoes', colorTag: 'burgundy', itemTag: 'heels', description: 'Steve Madden Darcey, wine patent leather, Mary Jane block heel' },
    ],
  },
  {
    folder: 'Yeni klasör - Kopya (7)',
    title: 'Mauve Striped Ruched Top & Wide-Leg Jeans',
    slug: 'mauve-striped-ruched-top-wide-leg-jeans',
    description: 'A casual-cute coquette look mixing a mauve striped long-sleeve ruched side top with relaxed light-wash wide-leg jeans. Nike Vomero pale pink sneakers tie the whole look together with effortless cool.',
    style: 'cute-coquette',
    season: 'spring',
    occasion: 'casual',
    occasions: ['school'],
    tags: ['striped', 'wide leg jeans', 'ruched', 'coquette', 'casual', 'Nike', 'pink sneakers', 'mauve'],
    mainImage: 'fashn-export-1779724304132.webp',
    mainImageAlt: 'Mauve striped ruched top with wide-leg jeans and Nike pale pink sneakers',
    pieces: [
      { file: '78edbda6-250b-4a36-ae28-a4d141d4d269.webp', name: 'Mauve Pink Stripe Ruched Long-Sleeve Top', type: 'top', colorTag: 'pink', itemTag: 'blouse', description: 'Mauve/pink stripe, ruched side detail, long sleeve' },
      { file: '27435727_fpx.webp', name: 'Light Wash Wide-Leg Jeans', type: 'bottom', colorTag: 'blue', itemTag: 'jeans', description: 'Low-rise wide-leg, light wash blue denim' },
      { file: 'Ekran görüntüsü 2026-05-25 054335.png', name: 'Nike Vomero Pale Pink Sneakers', type: 'shoes', colorTag: 'pink', itemTag: 'sneakers', description: 'Nike Vomero, pale pink/cream colorway, chunky sole' },
    ],
  },
  {
    folder: 'Yeni klasör - Kopya (8)',
    title: 'White Lace Crop & Patchwork Tiered Ruffle Skirt',
    slug: 'white-lace-crop-patchwork-tiered-ruffle-skirt',
    description: 'A sweet mix of textures — a white lace V-neck crop top paired with a delicate patchwork plaid and floral tiered ruffle mini skirt. Steve Madden Priya Pearl white lace heels add a bridal-coquette finishing touch.',
    style: 'cute-coquette',
    season: 'spring',
    occasion: 'casual',
    occasions: ['date-night'],
    tags: ['lace', 'white', 'tiered skirt', 'patchwork', 'coquette', 'Steve Madden', 'pearl', 'ruffle'],
    mainImage: 'fashn-export-1779724652800.webp',
    mainImageAlt: 'White lace crop top with patchwork tiered ruffle mini skirt and Steve Madden heels',
    pieces: [
      { file: '1-modelinfo-mia-us2.webp', name: 'White Lace V-Neck Crop Top', type: 'top', colorTag: 'white', itemTag: 'blouse', description: 'V-neck, lace fabric, ruffle trim, white, cap sleeve' },
      { file: '107170086_008_b.webp', name: 'Plaid & Floral Patchwork Tiered Ruffle Skirt', type: 'bottom', colorTag: 'beige', itemTag: 'skirt', description: 'Patchwork tiered ruffle, plaid and floral mix, mini' },
      { file: 'STEVEMADDEN_SHOES_PRIYA-PEARL_WHITE-LACE_0408_83066643-4a8e-4afb-99fe-34aea73fcb2e.webp', name: 'Steve Madden Priya Pearl White Lace Heels', type: 'shoes', colorTag: 'white', itemTag: 'heels', description: 'Steve Madden Priya, white lace, pearl detail, kitten heel' },
    ],
  },
  {
    folder: 'Yeni klasör - Kopya (9)',
    title: 'Pastel Stripe Crop & Heart-Pocket Jeans',
    slug: 'pastel-stripe-crop-heart-pocket-jeans',
    description: 'A playful Y2K-coquette combo with a pastel rainbow stripe scoop-neck crop top and light-wash wide-leg jeans featuring bold heart-cutout pocket details. Nike Dunk Low pink sneakers add the perfect retro-cute touch.',
    style: 'cute-coquette',
    season: 'spring',
    occasion: 'casual',
    occasions: ['school'],
    tags: ['pastel', 'striped', 'heart jeans', 'Y2K', 'coquette', 'Nike Dunk Low', 'crop top', 'wide leg'],
    mainImage: 'fashn-export-1779724765597.webp',
    mainImageAlt: 'Pastel rainbow stripe crop top with heart-pocket wide-leg jeans and Nike Dunk Low',
    pieces: [
      { file: '104959424_089_b4.webp', name: 'Pastel Rainbow Stripe Scoop Crop Top', type: 'top', colorTag: 'multicolor', itemTag: 'tshirt', description: 'Pastel rainbow stripes, scoop neck, cap sleeve, fitted' },
      { file: '61aydfVP5qL._AC_SX569_.jpg', name: 'Heart Pocket Wide-Leg Jeans', type: 'bottom', colorTag: 'blue', itemTag: 'jeans', description: 'Light wash, heart cutout pocket detail, wide leg, tie hem' },
      { file: 'NIKE+DUNK+LOW+(GS).avif', name: 'Nike Dunk Low Pink Sneakers', type: 'shoes', colorTag: 'pink', itemTag: 'sneakers', description: 'Nike Dunk Low GS, pink and white colorway' },
    ],
  },
  {
    folder: 'Yeni klasör - Kopya (10)',
    title: 'Pink Fuzzy Cardigan & Lace-Up Flare Jeans',
    slug: 'pink-fuzzy-cardigan-lace-up-flare-jeans',
    description: 'A cozy-cute coquette pairing of a soft pink open-front fuzzy cardigan with light-wash flared jeans featuring lace-up ankle details. Adidas Gazelle pink sneakers complete this romantically casual look.',
    style: 'cute-coquette',
    season: 'spring',
    occasion: 'casual',
    occasions: ['school'],
    tags: ['cardigan', 'flare jeans', 'pink', 'coquette', 'Adidas Gazelle', 'lace-up', 'casual', 'fuzzy'],
    mainImage: 'fashn-export-1779724853985.webp',
    mainImageAlt: 'Pink fuzzy cardigan with lace-up hem flared jeans and Adidas Gazelle pink sneakers',
    pieces: [
      { file: 'b28fa8f4-61eb-4494-ab65-139f5ee3918d.webp', name: 'Pink Open-Front Fuzzy Cardigan', type: 'top', colorTag: 'pink', itemTag: 'knitwear', description: 'Open-front cardigan, soft fuzzy knit, pink, V-neck' },
      { file: '51sIESqP7qL._AC_SX466_.jpg', name: 'Light Wash Lace-Up Hem Flared Jeans', type: 'bottom', colorTag: 'blue', itemTag: 'jeans', description: 'Flared leg, lace-up ankle slit detail, light blue wash' },
      { file: 'Gazelle_Indoor_Shoes_Pink_IH5484_01_standard - Kopya.avif', name: 'Adidas Gazelle Indoor Pink Sneakers', type: 'shoes', colorTag: 'pink', itemTag: 'sneakers', description: 'Adidas Gazelle Indoor, soft pink suede, retro sole' },
    ],
  },
  {
    folder: 'Yeni klasör - Kopya (11)',
    title: 'Pink Floral Crop & White Floral Layered Mini',
    slug: 'pink-floral-crop-white-floral-layered-mini',
    description: 'Fresh garden-party coquette featuring a pink floral ruched peplum crop top paired with a white floral layered tiered mini skirt. White high-top sneakers keep the look fun and playful.',
    style: 'cute-coquette',
    season: 'spring',
    occasion: 'casual',
    occasions: ['date-night'],
    tags: ['floral', 'pink', 'tiered skirt', 'white', 'coquette', 'casual', 'sneakers', 'peplum'],
    mainImage: 'fashn-export-1779724950219.webp',
    mainImageAlt: 'Pink floral peplum crop top with white floral layered mini skirt and white sneakers',
    pieces: [
      { file: '106379613_066_b2.webp', name: 'Pink Floral Peplum Ruched Crop Top', type: 'top', colorTag: 'pink', itemTag: 'blouse', description: 'Ruched tie-front, peplum hem, vibrant pink floral print' },
      { file: 'A13659C_A_107X1.jpg', name: 'White Floral Layered Tiered Mini Skirt', type: 'bottom', colorTag: 'white', itemTag: 'skirt', description: 'Layered tiered ruffle mini, white with delicate floral' },
      { file: 'Ekran görüntüsü 2026-05-25 020058.png', name: 'White High-Top Canvas Sneakers', type: 'shoes', colorTag: 'white', itemTag: 'sneakers', description: 'Classic white high-top canvas sneakers' },
    ],
  },
  {
    folder: 'Yeni klasör - Kopya (12)',
    title: 'Strawberry Print Cardigan & Flared Jeans',
    slug: 'strawberry-print-cardigan-flared-jeans',
    description: 'A kawaii-coquette look with a pink strawberry-print knit cardigan styled over light-wash flared jeans. White chunky sneakers add a Y2K sporty touch to this sweet and playful ensemble.',
    style: 'cute-coquette',
    season: 'spring',
    occasion: 'casual',
    occasions: ['school'],
    tags: ['strawberry', 'cardigan', 'flare jeans', 'pink', 'kawaii', 'coquette', 'graphic print', 'Y2K'],
    mainImage: 'fashn-export-1779725127661.webp',
    mainImageAlt: 'Pink strawberry print cardigan with light wash flared jeans and white chunky sneakers',
    pieces: [
      { file: 'Ekran görüntüsü 2026-05-25 015329.png', name: 'Pink Strawberry Print Knit Cardigan', type: 'top', colorTag: 'pink', itemTag: 'knitwear', description: 'Strawberry graphic print, open-front cardigan, pink knit' },
      { file: 'Ekran görüntüsü 2026-05-25 024359.png', name: 'Light Wash Flared Jeans', type: 'bottom', colorTag: 'blue', itemTag: 'jeans', description: 'Classic flared leg, light blue wash denim' },
      { file: 'u906040v_nb_05_i.webp', name: 'White Chunky Platform Sneakers', type: 'shoes', colorTag: 'white', itemTag: 'sneakers', description: 'White chunky platform sole, low-top sneakers' },
    ],
  },
  {
    folder: 'Yeni klasör - Kopya (13)',
    title: 'Daisy Bodysuit & Floral Embroidered Flare Jeans',
    slug: 'daisy-bodysuit-floral-embroidered-flare-jeans',
    description: 'A romantic boho-coquette look with a cream daisy floral bodysuit paired with dark-wash flared jeans featuring stunning pink floral embroidery. Steve Madden Bri Blush heels elevate this look from casual to dinner-ready.',
    style: 'cute-coquette',
    season: 'spring',
    occasion: 'casual',
    occasions: ['date-night'],
    tags: ['floral', 'daisy', 'bodysuit', 'embroidered jeans', 'coquette', 'Steve Madden', 'blush heels', 'boho'],
    mainImage: 'fashn-export-1779725484426.webp',
    mainImageAlt: 'Cream daisy bodysuit with floral embroidered flare jeans and Steve Madden blush heels',
    pieces: [
      { file: 'Ekran görüntüsü 2026-05-25 015459.png', name: 'Cream Daisy Floral Bodysuit', type: 'top', colorTag: 'beige', itemTag: 'blouse', description: 'Scoop neck bodysuit, daisy floral print, cream' },
      { file: 'Ekran görüntüsü 2026-05-25 025452.png', name: 'Dark Wash Floral Embroidered Flare Jeans', type: 'bottom', colorTag: 'blue', itemTag: 'jeans', description: 'Dark wash, pink floral embroidery detail, flared leg' },
      { file: 'STEVEMADDEN_SHOES_BRI-M_BLUSH01_39e7aeb1-4050-4a79-a5cb-fbe65e6c6c98.webp', name: 'Steve Madden Bri Blush Pointed Heels', type: 'shoes', colorTag: 'pink', itemTag: 'heels', description: 'Steve Madden Bri, blush/nude, pointed toe mule' },
    ],
  },
  {
    folder: 'Yeni klasör - Kopya (14)',
    title: 'Yellow Daisy Floral Co-Ord Set',
    slug: 'yellow-daisy-floral-coord-set',
    description: 'A matching set in the most coquette way — a yellow daisy floral crop top paired with ivory floral wide-leg pants for a coordinated head-to-toe look. Clean white sneakers balance the feminine floral print beautifully.',
    style: 'cute-coquette',
    season: 'summer',
    occasion: 'casual',
    occasions: ['date-night', 'travel'],
    tags: ['co-ord', 'floral', 'daisy', 'matching set', 'coquette', 'wide leg', 'summer', 'yellow'],
    mainImage: 'fashn-export-1779741191883.webp',
    mainImageAlt: 'Yellow daisy floral crop top with matching ivory floral wide-leg pants and white sneakers',
    pieces: [
      { file: 'Ekran görüntüsü 2026-05-25 015511.png', name: 'Yellow Daisy Floral Cap Sleeve Crop Top', type: 'top', colorTag: 'yellow', itemTag: 'blouse', description: 'Cap sleeve crop, yellow daisy floral, square neck' },
      { file: '185358_LTPK_PROFILE_01.avif', name: 'Ivory Floral Wide-Leg Pants', type: 'bottom', colorTag: 'beige', itemTag: 'trousers', description: 'Wide-leg flare silhouette, ivory cream floral print' },
      { file: 'd473a46d-b22b-4e9e-9643-8d5bbffab9d7.webp', name: 'White Low-Top Sneakers', type: 'shoes', colorTag: 'white', itemTag: 'sneakers', description: 'Clean white low-top sneakers, minimalist' },
    ],
  },
  {
    folder: 'Yeni klasör - Kopya (15)',
    title: 'Embroidered Floral Cardigan & White Lace Mini',
    slug: 'embroidered-floral-cardigan-white-lace-mini',
    description: 'A romantic layered coquette look with a cream embroidered floral cardigan over a pink floral crop top and white lace mini skirt. White tights and cream Mary Jane flats complete this delicate, feminine ensemble.',
    style: 'cute-coquette',
    season: 'spring',
    occasion: 'casual',
    occasions: ['date-night', 'school'],
    tags: ['floral cardigan', 'lace skirt', 'white tights', 'Mary Jane', 'coquette', 'layered', 'cream', 'embroidered'],
    mainImage: 'fashn-export-1779741385681.webp',
    mainImageAlt: 'Cream embroidered floral cardigan over pink crop top with white lace mini skirt and Mary Janes',
    pieces: [
      { file: 'Ekran görüntüsü 2026-05-25 015249.png', name: 'Cream Embroidered Floral Cardigan', type: 'top', colorTag: 'beige', itemTag: 'knitwear', description: 'Pink floral embroidery, cream ivory cardigan, romantic' },
      { file: 'Ekran görüntüsü 2026-05-25 015522.png', name: 'Pink Floral Fitted Crop Top', type: 'top', colorTag: 'pink', itemTag: 'tshirt', description: 'Fitted crop, pink floral print, layering piece' },
      { file: 'Ekran görüntüsü 2026-05-25 022359.png', name: 'White Lace Tiered Mini Skirt', type: 'bottom', colorTag: 'white', itemTag: 'skirt', description: 'Tiered lace trim mini skirt, white, ruffled hem' },
      { file: 'Ekran görüntüsü 2026-05-25 040559.png', name: 'Cream Mary Jane Ballet Flats', type: 'shoes', colorTag: 'beige', itemTag: 'loafers', description: 'Mary Jane strap, ballet flat, cream ivory' },
    ],
  },
  {
    folder: 'Yeni klasör 16',
    title: 'Pink Floral Ruched Top & Plaid Pleated Mini',
    slug: 'pink-floral-ruched-top-plaid-pleated-mini',
    description: 'A playful coquette mix of prints — a ruched pink floral cap-sleeve top paired with a pink plaid pleated mini skirt. Chunky pink platform Mary Jane heels with bow detail complete this doll-like, ultra-feminine look.',
    style: 'cute-coquette',
    season: 'spring',
    occasion: 'casual',
    occasions: ['date-night', 'school'],
    tags: ['floral', 'plaid', 'pleated', 'pink', 'coquette', 'platform Mary Jane', 'bow', 'print mixing'],
    mainImage: 'fashn-export-1779741479976.webp',
    mainImageAlt: 'Pink floral ruched top with pink plaid pleated mini skirt and platform Mary Jane heels',
    pieces: [
      { file: '1-modelinfo-nat-us2_07c8c71a-8f20-4a93-9e5e-46087958d6ee.webp', name: 'Pink Floral Ruched Cap-Sleeve Top', type: 'top', colorTag: 'pink', itemTag: 'blouse', description: 'Cap sleeve, pink floral print, ruched smocked detail' },
      { file: '41lWmkEmciL._AC_.jpg', name: 'Pink Plaid Pleated Mini Skirt', type: 'bottom', colorTag: 'pink', itemTag: 'skirt', description: 'Plaid print, pleated, pink and beige tones' },
      { file: '51TyGgp2kTL._AC_SX679_.jpg', name: 'Pink Platform Mary Jane Bow Heels', type: 'shoes', colorTag: 'pink', itemTag: 'heels', description: 'Chunky platform, Mary Jane strap, bow detail, pink' },
    ],
  },
  {
    folder: 'Yeni klasör 17',
    title: 'Ivory Lace Ruffle Tie-Front Co-Ord',
    slug: 'ivory-lace-ruffle-tie-front-coord',
    description: 'A dreamy all-cream coquette co-ord with a delicate lace ruffle blouse featuring a romantic tie-front and a matching tiered ruffle mini skirt. White platform Mary Jane heels with lace detail add the perfect romantic, ethereal finish.',
    style: 'cute-coquette',
    season: 'spring',
    occasion: 'date-night',
    occasions: ['casual', 'party-night-out'],
    tags: ['ivory', 'cream', 'lace', 'ruffle', 'co-ord', 'coquette', 'date night', 'platform heels', 'tie-front'],
    mainImage: 'fashn-export-1779741667482.webp',
    mainImageAlt: 'Ivory lace ruffle tie-front blouse with tiered ruffle mini skirt and white platform Mary Janes',
    pieces: [
      { file: '0f340fa2-c8fa-4237-a376-22e2ec8815d6.webp', name: 'Cream Lace Ruffle Tie-Front Blouse', type: 'top', colorTag: 'beige', itemTag: 'blouse', description: 'Long sleeve, lace texture, ruffle trim, tie-front, ivory' },
      { file: '61Re02Sy2-L._AC_SX466_.jpg', name: 'Ivory Tiered Ruffle Mini Skirt', type: 'bottom', colorTag: 'beige', itemTag: 'skirt', description: 'Tiered ruffle layers, ivory cream, mini length' },
      { file: '61mysM0ngwL._AC_SL1500_.jpg', name: 'White Lace Platform Mary Jane Heels', type: 'shoes', colorTag: 'white', itemTag: 'heels', description: 'Platform Mary Jane, white lace detail, chunky block heel' },
    ],
  },
]

// ─── Yardımcı fonksiyonlar ────────────────────────────────────────────────────

function getMimeType(filePath) {
  const ext = extname(filePath).toLowerCase()
  const map = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.avif': 'image/avif',
    '.gif': 'image/gif',
  }
  return map[ext] || 'image/jpeg'
}

async function uploadImage(filePath, filename) {
  if (!existsSync(filePath)) {
    console.warn(`  ⚠️  Dosya bulunamadı: ${filename}`)
    return null
  }
  const stream = createReadStream(filePath)
  const mimeType = getMimeType(filePath)
  try {
    const asset = await client.assets.upload('image', stream, {
      filename: basename(filePath),
      contentType: mimeType,
    })
    return asset
  } catch (err) {
    console.error(`  ❌ Upload hatası (${filename}):`, err.message)
    return null
  }
}

function makeSlugSafe(slug) {
  return slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// ─── Ana fonksiyon ────────────────────────────────────────────────────────────

async function main() {
  console.log('🎀  Cute & Coquette Outfits — Sanity Upload Başlıyor...\n')
  console.log(`📦  Toplam: ${OUTFITS.length} outfit\n`)

  const createdIds = []

  for (let i = 0; i < OUTFITS.length; i++) {
    const outfit = OUTFITS[i]
    const folderPath = join(BASE, outfit.folder)

    console.log(`\n── Outfit ${i + 1}/${OUTFITS.length}: ${outfit.title}`)
    console.log(`   📂 ${outfit.folder}`)

    // 1. Ana outfit görselini yükle
    const mainImagePath = join(folderPath, outfit.mainImage)
    console.log(`   📸 Ana görsel yükleniyor: ${outfit.mainImage}`)
    const mainAsset = await uploadImage(mainImagePath, outfit.mainImage)
    if (!mainAsset) {
      console.error(`   ❌ Ana görsel yüklenemedi, outfit atlanıyor.`)
      continue
    }
    console.log(`   ✅ Ana görsel: ${mainAsset._id}`)

    // 2. Piece görsellerini yükle
    const uploadedPieces = []
    for (const piece of outfit.pieces) {
      const piecePath = join(folderPath, piece.file)
      console.log(`   📸 Parça yükleniyor: ${piece.file}`)
      const pieceAsset = await uploadImage(piecePath, piece.file)
      if (pieceAsset) {
        console.log(`   ✅ ${piece.name}: ${pieceAsset._id}`)
        uploadedPieces.push({ ...piece, assetId: pieceAsset._id })
      } else {
        console.warn(`   ⚠️  ${piece.name} atlandı.`)
      }
    }

    if (uploadedPieces.length < 2) {
      console.warn(`   ⚠️  Yeterli parça yüklenemedi (${uploadedPieces.length}/2), outfit atlanıyor.`)
      continue
    }

    // 3. Sanity dökümanı oluştur
    const doc = {
      _type: 'outfit',
      title: outfit.title,
      slug: { _type: 'slug', current: makeSlugSafe(outfit.slug) },
      description: outfit.description,
      style: outfit.style,
      season: outfit.season,
      occasion: outfit.occasion,
      occasions: outfit.occasions || [],
      featured: false,
      tags: outfit.tags,
      publishedAt: new Date().toISOString(),
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: mainAsset._id },
        alt: outfit.mainImageAlt,
        hotspot: { x: 0.5, y: 0.3, height: 0.6, width: 0.6 },
      },
      pieces: uploadedPieces.map((piece, idx) => ({
        _key: `piece-${i}-${idx}`,
        _type: 'object',
        type: piece.type,
        name: piece.name,
        colorTag: piece.colorTag,
        itemTag: piece.itemTag,
        description: piece.description,
        image: {
          _type: 'image',
          asset: { _type: 'reference', _ref: piece.assetId },
          hotspot: { x: 0.5, y: 0.5, height: 0.8, width: 0.8 },
        },
      })),
    }

    try {
      // client.create() draft prefix olmadan doğrudan published döküman oluşturur
      const created = await client.create(doc)
      console.log(`   ✅ Yayınlandı: ${created._id}`)
      createdIds.push(created._id)
    } catch (err) {
      console.error(`   ❌ Döküman oluşturma hatası:`, err.message)
    }
  }

  console.log('\n' + '═'.repeat(60))
  console.log(`🎀  Tamamlandı! ${createdIds.length}/${OUTFITS.length} outfit başarıyla yüklendi.`)
  if (createdIds.length > 0) {
    console.log(`\nOluşturulan ID'ler:\n${createdIds.join('\n')}`)
  }
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
