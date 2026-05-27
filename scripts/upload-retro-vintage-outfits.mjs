import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'
import { extname, basename, join } from 'path'

const client = createClient({
  projectId: '29dp442n',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const BASE = '/Users/furkan/Downloads/Cute&Coquette and Retro&Vintage Outfits/Retro&Vintage Outfits'

function getMimeType(filePath) {
  const map = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.avif': 'image/avif',
  }
  return map[extname(filePath).toLowerCase()] || 'image/jpeg'
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function uploadImage(filePath, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const asset = await client.assets.upload('image', createReadStream(filePath), {
        filename: basename(filePath),
        contentType: getMimeType(filePath),
      })
      return asset
    } catch (err) {
      console.error(`  Upload attempt ${attempt} failed: ${err.message}`)
      if (attempt < retries) {
        console.log(`  Retrying in 3s...`)
        await sleep(3000)
      } else {
        console.error(`  Giving up on ${basename(filePath)}`)
        return null
      }
    }
  }
}

const OUTFITS = [
  {
    folder: 'Yeni klasör',
    title: 'Burgundy Pinstripe Shirt Vintage Flare Look',
    slug: 'burgundy-pinstripe-shirt-vintage-flare',
    description: 'A sleek vintage-inspired look combining a burgundy pinstripe fitted button-up shirt with low-rise distressed flare jeans and cream Converse Chuck 70 high tops. The fitted silhouette and retro denim cut channel effortless \'70s cool.',
    style: 'retro-vintage',
    season: 'spring',
    occasion: 'casual',
    occasions: ['date-night'],
    featured: false,
    tags: ['retro', 'vintage', 'flare jeans', 'pinstripe', 'converse'],
    mainImage: 'fashn-export-1779148034049.webp',
    mainImageAlt: 'Retro vintage outfit with burgundy pinstripe shirt, distressed flare jeans, and cream Converse',
    pieces: [
      {
        file: '06278692717-p.webp',
        name: 'Burgundy Pinstripe Fitted Shirt',
        type: 'top',
        colorTag: 'burgundy',
        itemTag: 'shirt',
        description: 'Fitted burgundy and white pinstripe button-up shirt with a retro \'70s silhouette, slightly cropped at the hem',
      },
      {
        file: 'Ekran görüntüsü 2026-05-19 022537.png',
        name: 'Distressed Low-Rise Flare Jeans',
        type: 'bottom',
        colorTag: 'blue',
        itemTag: 'jeans',
        description: 'Light wash low-rise distressed flare jeans with vintage wide-leg opening and faded wash',
      },
      {
        file: '162053C_A_107X1.webp',
        name: 'Cream Converse Chuck Taylor 70 Hi-Top',
        type: 'shoes',
        colorTag: 'beige',
        itemTag: 'sneakers',
        description: 'Cream/parchment Converse Chuck Taylor 70 hi-top canvas sneakers with classic retro rubber sole',
      },
    ],
  },
  {
    folder: 'Yeni klasör (2)',
    title: 'Red Gingham Crop Top Retro Bell-Bottom Flares',
    slug: 'red-gingham-crop-top-retro-bell-bottom',
    description: 'A bold retro outfit pairing a red gingham tie-front V-neck crop top with dark wash bell-bottom flare jeans and matching red Converse Chuck 70s. The gingham pattern and dramatic flare silhouette channel playful \'70s nostalgia.',
    style: 'retro-vintage',
    season: 'spring',
    occasion: 'casual',
    occasions: [],
    featured: false,
    tags: ['retro', 'gingham', 'bell-bottom', 'converse', 'red'],
    mainImage: 'fashn-export-1779143338583.webp',
    mainImageAlt: 'Retro vintage outfit with red gingham crop top, dark flare jeans, and red Converse',
    pieces: [
      {
        file: '0-modelinfo-serena-us2_9e7e959d-bde9-440a-b845-415e7c475da2.webp',
        name: 'Red Gingham Tie-Front Crop Top',
        type: 'top',
        colorTag: 'red',
        itemTag: 'blouse',
        description: 'Red and white gingham V-neck tie-front crop top with short sleeves, vintage picnic-chic style',
      },
      {
        file: 'Ekran görüntüsü 2026-05-19 020418.png',
        name: 'Dark Wash Bell-Bottom Flare Jeans',
        type: 'bottom',
        colorTag: 'blue',
        itemTag: 'jeans',
        description: 'Dark wash high-rise bell-bottom flare jeans with a dramatic flared leg opening and smooth front',
      },
      {
        file: '164944C_A_107X1.webp',
        name: 'Red Converse Chuck Taylor 70 Hi-Top',
        type: 'shoes',
        colorTag: 'red',
        itemTag: 'sneakers',
        description: 'Red Converse Chuck Taylor 70 hi-top canvas sneakers with vintage rubber sole — a bold color pop',
      },
    ],
  },
  {
    folder: 'Yeni klasör (3)',
    title: 'Brown Lace Crop Top Vintage Bell-Bottom Flares',
    slug: 'brown-lace-crop-vintage-bell-bottom',
    description: 'A romantic retro look featuring a brown floral lace long-sleeve V-neck crop top styled with vintage-wash wide bell-bottom flare jeans and cream-and-brown Adidas Spezial sneakers. The lace adds feminine texture to the laid-back denim silhouette.',
    style: 'retro-vintage',
    season: 'autumn',
    occasion: 'casual',
    occasions: ['date-night'],
    featured: false,
    tags: ['retro', 'lace', 'bell-bottom', 'flare jeans', 'adidas'],
    mainImage: 'fashn-export-1779411919629.webp',
    mainImageAlt: 'Retro vintage outfit with brown lace long-sleeve crop top, wide bell-bottom flare jeans, and Adidas sneakers',
    pieces: [
      {
        file: '5-modelinfo-dana-us2_fa307109-ee32-4e95-aa90-dac1248cdc5f.jpg',
        name: 'Brown Floral Lace Long-Sleeve Crop Top',
        type: 'top',
        colorTag: 'brown',
        itemTag: 'blouse',
        description: 'Brown floral lace long-sleeve V-neck crop top with semi-sheer texture and scalloped hem',
      },
      {
        file: '23266678_53978676_1000.webp',
        name: 'Vintage Wash Wide Bell-Bottom Jeans',
        type: 'bottom',
        colorTag: 'blue',
        itemTag: 'jeans',
        description: 'Light vintage-wash wide bell-bottom flare jeans with frayed hem and retro high-waist cut',
      },
      {
        file: 'Ekran görüntüsü 2026-05-21 175020.png',
        name: 'Cream & Brown Adidas Spezial Sneakers',
        type: 'shoes',
        colorTag: 'beige',
        itemTag: 'sneakers',
        description: 'Cream suede Adidas handball sneakers with brown leather stripe accents and gum sole',
      },
    ],
  },
  {
    folder: 'Yeni klasör (4)',
    title: 'Olive Houndstooth Top Vintage Wide-Leg Jeans Utility Jacket',
    slug: 'olive-houndstooth-top-vintage-wide-leg-utility-jacket',
    description: 'A retro-inspired layered look featuring an olive houndstooth plaid cap-sleeve fitted top, high-waist vintage wide-leg jeans, sage New Balance sneakers, and a sage utility crop jacket. The plaid pattern and relaxed denim silhouette nod to \'70s retro style.',
    style: 'retro-vintage',
    season: 'spring',
    occasion: 'casual',
    occasions: [],
    featured: false,
    tags: ['retro', 'houndstooth', 'wide-leg jeans', 'new balance', 'utility jacket'],
    mainImage: 'fashn-export-1779412052125.webp',
    mainImageAlt: 'Retro vintage outfit with olive houndstooth top, wide-leg jeans, sage New Balance sneakers, and utility jacket',
    pieces: [
      {
        file: '71L6FbooFuL._AC_SY550_.jpg',
        name: 'Olive Houndstooth Cap-Sleeve Fitted Top',
        type: 'top',
        colorTag: 'khaki',
        itemTag: 'shirt',
        description: 'Olive and teal houndstooth plaid cap-sleeve fitted button-front top with stud embellishment (Cider)',
      },
      {
        file: '14a0df1b-58c9-4cc4-b903-f80c7ab1bbbe.webp',
        name: 'High-Waist Vintage Wide-Leg Flare Jeans',
        type: 'bottom',
        colorTag: 'blue',
        itemTag: 'jeans',
        description: 'Medium wash high-waist wide-leg flare jeans with vintage double-button closure',
      },
      {
        file: 'Ekran görüntüsü 2026-05-21 174627.png',
        name: 'Sage New Balance Vintage Sneakers',
        type: 'shoes',
        colorTag: 'khaki',
        itemTag: 'sneakers',
        description: 'Olive sage green New Balance vintage running sneakers with navy accent and gum sole',
      },
      {
        file: 'Ekran görüntüsü 2026-05-21 182854.png',
        name: 'Sage Oversized Utility Crop Jacket',
        type: 'outerwear',
        colorTag: 'khaki',
        itemTag: 'jacket',
        description: 'Sage/dusty teal oversized drop-shoulder utility crop jacket with patch pockets',
      },
    ],
  },
  {
    folder: 'Yeni klasör (5)',
    title: 'Green Velvet Wrap Top Crystal Waistband Flare Jeans',
    slug: 'green-velvet-wrap-top-crystal-waistband-flare',
    description: 'An earthy vintage look combining a green and brown burnout velvet cross-front sleeveless wrap top with light wash flare jeans featuring a crystal waistband, paired with teal Keen Jasper sneakers. The velvet texture and flared silhouette channel boho-retro energy.',
    style: 'retro-vintage',
    season: 'autumn',
    occasion: 'casual',
    occasions: ['date-night'],
    featured: false,
    tags: ['retro', 'velvet', 'flare jeans', 'boho', 'green'],
    mainImage: 'fashn-export-1779412446374.webp',
    mainImageAlt: 'Retro vintage outfit with green velvet wrap top, crystal waistband flare jeans, and teal sneakers',
    pieces: [
      {
        file: '71NLUaNGbVL._AC_SY550_.jpg',
        name: 'Green Brown Velvet Cross-Front Wrap Top',
        type: 'top',
        colorTag: 'green',
        itemTag: 'blouse',
        description: 'Green and brown burnout velvet cross-front sleeveless wrap halter crop top with ruched waist',
      },
      {
        file: '22433022_52411685_1000.webp',
        name: 'Crystal Waistband High-Rise Flare Jeans',
        type: 'bottom',
        colorTag: 'blue',
        itemTag: 'jeans',
        description: 'Light wash high-rise kick flare jeans with silver chain and crystal waistband embellishment',
      },
      {
        file: 'Ekran görüntüsü 2026-05-21 174305.png',
        name: 'Teal Keen Jasper Sneakers',
        type: 'shoes',
        colorTag: 'green',
        itemTag: 'sneakers',
        description: 'Teal sage green Keen Jasper lace-up sneakers with suede upper and rubber sole',
      },
    ],
  },
  {
    folder: 'Yeni klasör (6) - Kopya',
    title: 'Brown Leather Moto Jacket Fringe Cowboy Boots Western Look',
    slug: 'brown-leather-moto-jacket-fringe-cowboy-boots-western',
    description: 'A Western-meets-retro outfit featuring a dark brown distressed suede moto jacket over a brown lace-up front halter cami, a khaki pleated mini skirt, and tan fringe cowboy boots. The layered textures create a bold vintage Western aesthetic.',
    style: 'retro-vintage',
    season: 'spring',
    occasion: 'casual',
    occasions: ['date-night'],
    featured: false,
    tags: ['western', 'retro', 'leather jacket', 'cowboy boots', 'fringe'],
    mainImage: 'fashn-export-1779415106270.webp',
    mainImageAlt: 'Retro western outfit with brown leather moto jacket, lace cami, khaki mini skirt, and tan fringe cowboy boots',
    pieces: [
      {
        file: 'Ekran görüntüsü 2026-05-21 182826.png',
        name: 'Dark Brown Distressed Suede Moto Jacket',
        type: 'outerwear',
        colorTag: 'brown',
        itemTag: 'leather-jacket',
        description: 'Dark chocolate brown distressed suede moto jacket with dual zip pockets and worn-in patina',
      },
      {
        file: 'Ekran görüntüsü 2026-05-22 025827.png',
        name: 'Brown Leather Lace-Up Halter Cami',
        type: 'top',
        colorTag: 'brown',
        itemTag: 'blouse',
        description: 'Brown faux leather lace-up front halter cami with corset-style grommets and tie detail',
      },
      {
        file: 'Ekran görüntüsü 2026-05-22 025920.png',
        name: 'Khaki Pleated Mini Skirt',
        type: 'bottom',
        colorTag: 'khaki',
        itemTag: 'skirt',
        description: 'Khaki/camel pleated A-line mini skirt with a contrasting dark waistband',
      },
      {
        file: 'Ekran görüntüsü 2026-05-21 174045.png',
        name: 'Tan Suede Fringe Cowboy Boots',
        type: 'shoes',
        colorTag: 'beige',
        itemTag: 'boots',
        description: 'Tan suede fringe cowboy boots with side buckle strap and stacked heel',
      },
    ],
  },
  {
    folder: 'Yeni klasör (7) - Kopya',
    title: 'Grey Leather Moto Jacket Striped Polo Khaki Mini Cowboy Boots',
    slug: 'grey-leather-moto-striped-polo-khaki-mini-cowboy-boots',
    description: 'A cool vintage-inspired ensemble with a grey distressed leather moto jacket, beige striped knit polo crop tee, khaki denim mini skirt, and tan embroidered Western cowboy boots. The retro polo stripe adds a preppy contrast to the biker jacket edge.',
    style: 'retro-vintage',
    season: 'spring',
    occasion: 'casual',
    occasions: [],
    featured: false,
    tags: ['retro', 'leather jacket', 'cowboy boots', 'polo', 'vintage'],
    mainImage: 'fashn-export-1779419216110.webp',
    mainImageAlt: 'Retro vintage outfit with grey leather moto jacket, striped polo crop, khaki mini skirt, and tan cowboy boots',
    pieces: [
      {
        file: '761f206a-04fd-427c-b0db-ec3dc280d4a0.webp',
        name: 'Grey Distressed Vintage Leather Moto Jacket',
        type: 'outerwear',
        colorTag: 'grey',
        itemTag: 'leather-jacket',
        description: 'Grey/taupe vintage distressed moto biker jacket with snap collar and brass zip',
      },
      {
        file: 'Ekran görüntüsü 2026-05-21 180018.png',
        name: 'Beige Striped Knit Polo Crop Tee',
        type: 'top',
        colorTag: 'beige',
        itemTag: 'knitwear',
        description: 'Beige and brown striped knit polo crop tee with ribbed collar and short sleeves',
      },
      {
        file: 'Ekran görüntüsü 2026-05-21 181737.png',
        name: 'Khaki Beige Denim Mini Skirt',
        type: 'bottom',
        colorTag: 'khaki',
        itemTag: 'skirt',
        description: 'Khaki beige raw-hem denim mini skirt with classic 5-pocket construction',
      },
      {
        file: 'Ekran görüntüsü 2026-05-21 174021.png',
        name: 'Tan Embroidered Western Cowboy Boots',
        type: 'shoes',
        colorTag: 'beige',
        itemTag: 'boots',
        description: 'Tan camel suede Western cowboy boots with intricate embroidered stitching',
      },
    ],
  },
  {
    folder: 'Yeni klasör (8) - Kopya',
    title: 'White Lace Bell Sleeve Blouse Brown Ruffle Skirt Gold Sandals',
    slug: 'white-lace-bell-sleeve-brown-ruffle-skirt-gold-sandals',
    description: 'A romantic boho-retro look pairing a white sheer lace bell-sleeve tie-front crop blouse with a brown crochet ruffle asymmetric mini skirt, a cream lace handkerchief midi skirt, and gold woven block heel sandals. The mix of lace textures and vintage silhouettes creates an effortlessly dreamy outfit.',
    style: 'retro-vintage',
    season: 'summer',
    occasion: 'date-night',
    occasions: ['casual'],
    featured: false,
    tags: ['retro', 'lace', 'boho', 'bell-sleeve', 'ruffle'],
    mainImage: 'fashn-export-1779419419176.webp',
    mainImageAlt: 'Retro boho outfit with white lace bell-sleeve blouse, brown ruffle mini skirt, and gold sandals',
    pieces: [
      {
        file: '1-modelinfo-crystal-us2_50ef9183-9e62-45e8-8ed6-ec2f907954c4.webp',
        name: 'White Lace Bell-Sleeve Tie-Front Crop Blouse',
        type: 'top',
        colorTag: 'white',
        itemTag: 'blouse',
        description: 'White sheer lace bell-sleeve tie-front crop blouse with floral lace pattern and ruffled cuffs',
      },
      {
        file: 'Ekran görüntüsü 2026-05-21 183856.png',
        name: 'Brown Crochet Ruffle Asymmetric Mini Skirt',
        type: 'bottom',
        colorTag: 'brown',
        itemTag: 'skirt',
        description: 'Brown crochet mesh asymmetric ruffle mini skirt with handkerchief hem',
      },
      {
        file: 'Ekran görüntüsü 2026-05-21 184012.png',
        name: 'Cream Lace Handkerchief Midi Skirt',
        type: 'bottom',
        colorTag: 'white',
        itemTag: 'skirt',
        description: 'Cream off-white lace asymmetric handkerchief midi skirt with vintage leather waistband',
      },
      {
        file: 'Ekran görüntüsü 2026-05-21 174001.png',
        name: 'Gold Woven Block Heel Strappy Sandals',
        type: 'shoes',
        colorTag: 'yellow',
        itemTag: 'sandals',
        description: 'Gold woven leather block heel strappy sandals with ankle buckle closure',
      },
    ],
  },
  {
    folder: 'Yeni klasör (9) - Kopya',
    title: 'Burgundy Lace Cami Plaid Asymmetric Mini Adidas Sambas',
    slug: 'burgundy-lace-cami-plaid-asymmetric-mini-sambas',
    description: 'A retro-inspired monochromatic burgundy outfit featuring a lace bustier cami paired with a brown and burgundy plaid asymmetric handkerchief mini skirt and burgundy Adidas Samba sneakers. The rich tones and mixed textures give a vintage editorial feel.',
    style: 'retro-vintage',
    season: 'autumn',
    occasion: 'casual',
    occasions: ['date-night'],
    featured: false,
    tags: ['retro', 'lace', 'plaid', 'adidas samba', 'burgundy'],
    mainImage: 'fashn-export-1779582808869.webp',
    mainImageAlt: 'Retro vintage outfit with burgundy lace cami, plaid asymmetric mini skirt, and burgundy Adidas Sambas',
    pieces: [
      {
        file: 'Ekran görüntüsü 2026-05-21 175838.png',
        name: 'Burgundy Lace Bustier Cami Top',
        type: 'top',
        colorTag: 'burgundy',
        itemTag: 'blouse',
        description: 'Burgundy wine lace bustier cami with spaghetti straps and floral lace overlay on bodice',
      },
      {
        file: 'Ekran görüntüsü 2026-05-22 030006.png',
        name: 'Brown Burgundy Plaid Asymmetric Mini Skirt',
        type: 'bottom',
        colorTag: 'brown',
        itemTag: 'skirt',
        description: 'Brown and burgundy plaid asymmetric handkerchief mini skirt with black leather belt',
      },
      {
        file: 'Ekran görüntüsü 2026-05-21 173756.png',
        name: 'Burgundy Adidas Samba OG Sneakers',
        type: 'shoes',
        colorTag: 'burgundy',
        itemTag: 'sneakers',
        description: 'Burgundy wine Adidas Samba OG low-top sneakers with cream stripes and gum sole',
      },
    ],
  },
  {
    folder: 'Yeni klasör (10) - Kopya',
    title: 'Olive Crop Tank Denim Pleated Mini Black Converse',
    slug: 'olive-crop-tank-denim-pleated-mini-black-converse',
    description: 'A casual vintage-cool look featuring an olive seam-detail ribbed crop tank paired with a light wash denim pleated mini skirt and black Converse Chuck Taylor high tops. Simple, effortless, and rooted in retro street style.',
    style: 'retro-vintage',
    season: 'summer',
    occasion: 'casual',
    occasions: [],
    featured: false,
    tags: ['retro', 'vintage', 'denim', 'converse', 'casual'],
    mainImage: 'fashn-export-1779582930168.webp',
    mainImageAlt: 'Retro casual outfit with olive crop tank top, denim pleated mini skirt, and black Converse',
    pieces: [
      {
        file: 'Ekran görüntüsü 2026-05-21 182802.png',
        name: 'Olive Seam-Detail Ribbed Crop Tank',
        type: 'top',
        colorTag: 'khaki',
        itemTag: 'tshirt',
        description: 'Olive khaki seam-detail ribbed cotton crop tank top with a slim, fitted silhouette',
      },
      {
        file: 'Ekran görüntüsü 2026-05-22 030102.png',
        name: 'Light Wash Denim Pleated Mini Skirt',
        type: 'bottom',
        colorTag: 'blue',
        itemTag: 'skirt',
        description: 'Light wash denim pleated mini skirt with double button front and relaxed fit',
      },
      {
        file: 'Ekran görüntüsü 2026-05-21 173524.png',
        name: 'Black Converse Chuck Taylor High Tops',
        type: 'shoes',
        colorTag: 'black',
        itemTag: 'sneakers',
        description: 'Black Converse Chuck Taylor All Star high top canvas sneakers, a timeless retro staple',
      },
    ],
  },
  {
    folder: 'Yeni klasör (11) - Kopya',
    title: 'Wild West Rodeo Graphic Tee Wide-Leg Jeans Huarache Sandals',
    slug: 'wild-west-rodeo-graphic-tee-wide-leg-huarache',
    description: 'A Y2K-meets-vintage Western look featuring a brown Wild West Rodeo star graphic baby tee with wide-leg cropped baggy light wash jeans and caramel woven huarache sandals. The retro graphic adds playful vintage charm to the relaxed silhouette.',
    style: 'retro-vintage',
    season: 'summer',
    occasion: 'casual',
    occasions: [],
    featured: false,
    tags: ['y2k', 'retro', 'graphic tee', 'wide-leg jeans', 'western'],
    mainImage: 'fashn-export-1779583247659.webp',
    mainImageAlt: 'Y2K retro vintage outfit with Wild West Rodeo graphic tee, wide-leg jeans, and woven huarache sandals',
    pieces: [
      {
        file: 'Ekran görüntüsü 2026-05-21 181623.png',
        name: 'Brown Wild West Rodeo Graphic Baby Tee',
        type: 'top',
        colorTag: 'brown',
        itemTag: 'tshirt',
        description: 'Brown Y2K "Wild West Rodeo" star graphic baby tee with V-neck and vintage wash',
      },
      {
        file: 'Ekran görüntüsü 2026-05-21 182743.png',
        name: 'Light Wash Wide-Leg Cropped Baggy Jeans',
        type: 'bottom',
        colorTag: 'blue',
        itemTag: 'jeans',
        description: 'Light wash wide-leg cropped baggy denim jeans with relaxed fit and raw hem',
      },
      {
        file: 'Ekran görüntüsü 2026-05-21 173726.png',
        name: 'Caramel Woven Huarache Leather Sandals',
        type: 'shoes',
        colorTag: 'brown',
        itemTag: 'sandals',
        description: 'Caramel brown woven huarache leather flat sandals with open-toe design',
      },
    ],
  },
  {
    folder: 'Yeni klasör (12) - Kopya',
    title: 'Burgundy Paisley Mesh Cami Dark Floral Midi Skirt Stilettos',
    slug: 'burgundy-paisley-mesh-cami-dark-floral-midi-stilettos',
    description: 'A sultry vintage-inspired evening look featuring a burgundy and rust paisley mesh spaghetti strap cami paired with a dark brown paisley mesh bias-cut midi skirt and dark chocolate ankle-strap stiletto sandals. The rich paisley print and flowing midi silhouette channel old-money retro glamour.',
    style: 'retro-vintage',
    season: 'autumn',
    occasion: 'date-night',
    occasions: ['casual'],
    featured: false,
    tags: ['retro', 'paisley', 'mesh', 'midi skirt', 'vintage'],
    mainImage: 'fashn-export-1779583351796.webp',
    mainImageAlt: 'Retro vintage outfit with burgundy paisley mesh cami, dark floral midi skirt, and dark brown stilettos',
    pieces: [
      {
        file: 'Ekran görüntüsü 2026-05-21 181722.png',
        name: 'Burgundy Paisley Mesh Spaghetti Cami',
        type: 'top',
        colorTag: 'burgundy',
        itemTag: 'blouse',
        description: 'Burgundy and rust paisley mesh spaghetti strap cami with lace-trim edge and vintage boho print',
      },
      {
        file: 'Ekran görüntüsü 2026-05-22 024227.png',
        name: 'Dark Brown Paisley Mesh Midi Skirt',
        type: 'bottom',
        colorTag: 'brown',
        itemTag: 'skirt',
        description: 'Dark brown and burgundy paisley print mesh bias-cut midi skirt with flowing hem',
      },
      {
        file: 'Ekran görüntüsü 2026-05-21 173748.png',
        name: 'Dark Brown Ankle-Strap Stiletto Sandals',
        type: 'shoes',
        colorTag: 'brown',
        itemTag: 'heels',
        description: 'Dark chocolate brown leather ankle-strap pointed-toe stiletto sandals',
      },
    ],
  },
  {
    folder: 'Yeni klasör (13) - Kopya',
    title: 'Pink Plaid Polo Crop Beige Wide-Leg Trousers Kitten Mules',
    slug: 'pink-plaid-polo-crop-beige-wide-leg-trousers',
    description: 'A soft retro feminine look featuring a pink plaid short-sleeve polo crop top paired with beige wide-leg cropped trousers and nude suede cross-strap kitten heel mules. The pastel plaid and relaxed trouser silhouette evoke a chic \'70s-inspired aesthetic.',
    style: 'retro-vintage',
    season: 'spring',
    occasion: 'casual',
    occasions: ['date-night'],
    featured: false,
    tags: ['retro', 'plaid', 'polo', 'wide-leg trousers', 'pastel'],
    mainImage: 'fashn-export-1779584388628.webp',
    mainImageAlt: 'Retro vintage outfit with pink plaid polo crop top, beige wide-leg trousers, and kitten heel mules',
    pieces: [
      {
        file: 'Ekran görüntüsü 2026-05-21 181645.png',
        name: 'Pink Plaid Short-Sleeve Polo Crop Top',
        type: 'top',
        colorTag: 'pink',
        itemTag: 'shirt',
        description: 'Pink/rose plaid short-sleeve fitted polo crop top with button placket and collar',
      },
      {
        file: 'Ekran görüntüsü 2026-05-22 031738.png',
        name: 'Beige High-Waist Wide-Leg Cropped Trousers',
        type: 'bottom',
        colorTag: 'beige',
        itemTag: 'trousers',
        description: 'Beige/stone high-waist wide-leg cropped trousers with clean tailored lines',
      },
      {
        file: 'Ekran görüntüsü 2026-05-22 030145.png',
        name: 'Pink Floral Asymmetric Wrap Skirt',
        type: 'bottom',
        colorTag: 'pink',
        itemTag: 'skirt',
        description: 'Dusty pink floral print asymmetric wrap skirt with adjustable tie waist',
      },
      {
        file: 'Ekran görüntüsü 2026-05-21 173453.png',
        name: 'Nude Suede Cross-Strap Kitten Heel Mules',
        type: 'shoes',
        colorTag: 'beige',
        itemTag: 'heels',
        description: 'Nude beige suede cross-strap kitten heel slide mules with pointed toe',
      },
    ],
  },
  {
    folder: 'Yeni klasör (14) - Kopya',
    title: 'White Lace Strapless Top Brown Leopard Midi Skirt Ballet Flats',
    slug: 'white-lace-strapless-brown-leopard-midi-ballet-flats',
    description: 'A vintage-feminine outfit pairing a white sheer lace strapless tie halter bow crop top with a dark brown leopard print chiffon bias-cut midi skirt and chocolate brown cross-strap ballet flats. The contrast of delicate lace and bold animal print creates a sophisticated retro look.',
    style: 'retro-vintage',
    season: 'spring',
    occasion: 'date-night',
    occasions: ['casual'],
    featured: false,
    tags: ['retro', 'lace', 'leopard', 'midi skirt', 'vintage'],
    mainImage: 'fashn-export-1779584563448.webp',
    mainImageAlt: 'Retro vintage outfit with white lace strapless crop top, dark brown leopard midi skirt, and ballet flats',
    pieces: [
      {
        file: 'Ekran görüntüsü 2026-05-22 025710.png',
        name: 'White Lace Strapless Tie Halter Bow Crop Top',
        type: 'top',
        colorTag: 'white',
        itemTag: 'blouse',
        description: 'White sheer lace strapless halter bow crop top with tie detail and delicate lace fabric',
      },
      {
        file: 'Ekran görüntüsü 2026-05-22 023913.png',
        name: 'Dark Brown Leopard Print Chiffon Midi Skirt',
        type: 'bottom',
        colorTag: 'brown',
        itemTag: 'skirt',
        description: 'Dark brown leopard/animal print chiffon bias-cut midi skirt with a fluid, flowing drape',
      },
      {
        file: 'Ekran görüntüsü 2026-05-21 173352.png',
        name: 'Dark Brown Cross-Strap Ballet Flats',
        type: 'shoes',
        colorTag: 'brown',
        itemTag: 'loafers',
        description: 'Dark chocolate brown elastic cross-strap ballet flat shoes with minimalist silhouette',
      },
    ],
  },
  {
    folder: 'Yeni klasör (15) - Kopya',
    title: 'Dark Brown Satin Cami Ruched Midi Skirt Block Heel Mules',
    slug: 'dark-brown-satin-cami-ruched-midi-block-heel-mules',
    description: 'An elevated all-brown retro look featuring a dark brown satin lace-trim tie-front cami with a matching chocolate brown ruched gathered midi skirt and square-toe thong block heel mules. The monochromatic tonal approach feels effortlessly sophisticated.',
    style: 'retro-vintage',
    season: 'autumn',
    occasion: 'date-night',
    occasions: ['casual'],
    featured: false,
    tags: ['retro', 'satin', 'monochrome', 'midi skirt', 'brown'],
    mainImage: 'fashn-export-1779584731655.webp',
    mainImageAlt: 'Retro vintage all-brown outfit with dark brown satin cami, ruched midi skirt, and block heel mules',
    pieces: [
      {
        file: 'Ekran görüntüsü 2026-05-21 175851.png',
        name: 'Dark Brown Satin Lace-Trim Tie-Front Cami',
        type: 'top',
        colorTag: 'brown',
        itemTag: 'blouse',
        description: 'Dark brown satin cami with lace trim edges, spaghetti straps, and front tie closure',
      },
      {
        file: 'Ekran görüntüsü 2026-05-21 184122.png',
        name: 'Chocolate Brown Ruched Gathered Midi Skirt',
        type: 'bottom',
        colorTag: 'brown',
        itemTag: 'skirt',
        description: 'Dark chocolate brown ruched gathered midi skirt with a fitted silhouette and flared hem',
      },
      {
        file: 'Ekran görüntüsü 2026-05-21 173310.png',
        name: 'Dark Brown Square-Toe Block Heel Thong Mules',
        type: 'shoes',
        colorTag: 'brown',
        itemTag: 'heels',
        description: 'Dark brown square-toe thong block heel mule sandals with a clean minimalist silhouette',
      },
    ],
  },
  {
    folder: 'Yeni klasör (16) - Kopya',
    title: 'Brown Lace Cut-Out Crop Sequin Mini Moto Harness Boots',
    slug: 'brown-lace-cutout-crop-sequin-mini-moto-boots',
    description: 'A bold retro-glam look combining a dark brown lace short-sleeve chest cut-out crop top with a brown sequin-waist asymmetric handkerchief mini skirt and knee-high brown moto harness boots. The mix of lace, sequins, and leather creates a statement vintage party outfit.',
    style: 'retro-vintage',
    season: 'autumn',
    occasion: 'date-night',
    occasions: ['casual'],
    featured: false,
    tags: ['retro', 'lace', 'sequin', 'moto boots', 'glam'],
    mainImage: 'fashn-export-1779585983072.webp',
    mainImageAlt: 'Retro glam outfit with brown lace cut-out crop top, sequin asymmetric mini skirt, and moto harness boots',
    pieces: [
      {
        file: 'Ekran görüntüsü 2026-05-21 180238.png',
        name: 'Dark Brown Lace Short-Sleeve Cut-Out Crop Top',
        type: 'top',
        colorTag: 'brown',
        itemTag: 'blouse',
        description: 'Dark brown lace short-sleeve crop top with keyhole chest cut-out and scalloped hem',
      },
      {
        file: 'Ekran görüntüsü 2026-05-22 032549.png',
        name: 'Brown Sequin-Waist Asymmetric Handkerchief Mini',
        type: 'bottom',
        colorTag: 'brown',
        itemTag: 'skirt',
        description: 'Dark brown asymmetric handkerchief mini skirt with a sequin and crystal embellished waistband',
      },
      {
        file: 'Ekran görüntüsü 2026-05-21 173300.png',
        name: 'Brown Knee-High Moto Harness Boots',
        type: 'shoes',
        colorTag: 'brown',
        itemTag: 'boots',
        description: 'Brown knee-high moto harness boots with ring buckle strap and stacked sole',
      },
    ],
  },
  {
    folder: 'Yeni klasör (17) - Kopya',
    title: 'Floral Embroidered Boho Top Quilted Denim Shorts Black Converse',
    slug: 'floral-embroidered-boho-top-quilted-denim-shorts',
    description: 'A boho-retro casual look pairing a cream floral embroidered gauze V-neck peplum top with light wash diamond-quilted denim shorts and black Converse Chuck Taylor high tops. The delicate floral embroidery adds vintage feminine charm to the relaxed summer silhouette.',
    style: 'retro-vintage',
    season: 'summer',
    occasion: 'casual',
    occasions: [],
    featured: false,
    tags: ['retro', 'boho', 'floral embroidery', 'denim shorts', 'converse'],
    mainImage: 'Ekran görüntüsü 2026-05-24 053446.png',
    mainImageAlt: 'Retro boho outfit with floral embroidered cream top, quilted denim shorts, and black Converse',
    pieces: [
      {
        file: 'Ekran görüntüsü 2026-05-24 053446.png',
        name: 'Cream Floral Embroidered Boho Peplum Top',
        type: 'top',
        colorTag: 'white',
        itemTag: 'blouse',
        description: 'Cream white gauze floral embroidered V-neck sleeveless peplum top with scalloped hem',
      },
      {
        file: 'Ekran görüntüsü 2026-05-24 054436.png',
        name: 'Light Wash Diamond Quilted Denim Shorts',
        type: 'bottom',
        colorTag: 'blue',
        itemTag: 'shorts',
        description: 'Light wash diamond argyle-quilted denim cuffed shorts with a retro summer feel',
      },
      {
        file: 'Ekran görüntüsü 2026-05-21 173524.png',
        name: 'Black Converse Chuck Taylor High Tops',
        type: 'shoes',
        colorTag: 'black',
        itemTag: 'sneakers',
        description: 'Black Converse Chuck Taylor All Star high top canvas sneakers, a timeless staple',
      },
    ],
  },
  {
    folder: 'Yeni klasör (18) - Kopya',
    title: 'Burgundy Sequin Embroidered Halter Floral Embroidered Jeans',
    slug: 'burgundy-sequin-halter-floral-embroidered-jeans',
    description: 'A show-stopping retro-glam outfit featuring a burgundy sequin and beaded embroidered halter crop top paired with light wash wide-leg jeans adorned with bold floral embroidery and burgundy patent leather pointed slingback stiletto heels. The embellished pieces create a statement vintage \'70s look.',
    style: 'retro-vintage',
    season: 'spring',
    occasion: 'date-night',
    occasions: ['casual'],
    featured: false,
    tags: ['retro', 'sequin', 'floral embroidery', 'halter', 'vintage 70s'],
    mainImage: 'fashn-export-1779586285414.webp',
    mainImageAlt: 'Retro glam outfit with burgundy sequin halter top, floral embroidered wide-leg jeans, and slingback heels',
    pieces: [
      {
        file: '41e3f7c1-603a-4c82-ac8c-ee8cdcaadc74.webp',
        name: 'Burgundy Sequin Embroidered Halter Crop Top',
        type: 'top',
        colorTag: 'burgundy',
        itemTag: 'blouse',
        description: 'Burgundy wine sequin and beaded embroidered halter neck crop top with open back',
      },
      {
        file: '6b0526ed-ac8c-41ef-8987-74fbc072bbf1.webp',
        name: 'Floral Embroidered Wide-Leg Jeans',
        type: 'bottom',
        colorTag: 'blue',
        itemTag: 'jeans',
        description: 'Light wash wide-leg jeans with large-scale floral and botanical embroidery on the legs',
      },
      {
        file: '21228814_51104277_1000.webp',
        name: 'Burgundy Patent Leather Slingback Stilettos',
        type: 'shoes',
        colorTag: 'burgundy',
        itemTag: 'heels',
        description: 'Burgundy wine patent leather pointed-toe slingback stiletto heels with gold ring hardware',
      },
    ],
  },
  {
    folder: 'Yeni klasör (19) - Kopya',
    title: 'Dark Brown Leather Jacket Vintage Flare Jeans Autry Sneakers',
    slug: 'dark-brown-leather-jacket-vintage-flare-autry-sneakers',
    description: 'A timeless retro-cool layered look featuring a dark chocolate brown zip-front leather jacket over a white ribbed tank, paired with light wash vintage low-rise flare bootcut jeans and taupe Autry vintage retro sneakers. Classic proportions with a modern edge.',
    style: 'retro-vintage',
    season: 'spring',
    occasion: 'casual',
    occasions: [],
    featured: false,
    tags: ['retro', 'leather jacket', 'flare jeans', 'vintage', 'autry'],
    mainImage: 'fashn-export-1779588747630.webp',
    mainImageAlt: 'Retro vintage outfit with dark brown leather jacket, white tank, flare jeans, and taupe Autry sneakers',
    pieces: [
      {
        file: 'Ekran görüntüsü 2026-05-22 032926.png',
        name: 'Dark Brown Zip-Front Leather Biker Jacket',
        type: 'outerwear',
        colorTag: 'brown',
        itemTag: 'leather-jacket',
        description: 'Dark chocolate brown zip-front fitted leather biker jacket with standing collar',
      },
      {
        file: 'Ekran görüntüsü 2026-05-22 030626.png',
        name: 'Vintage Low-Rise Flare Bootcut Jeans',
        type: 'bottom',
        colorTag: 'blue',
        itemTag: 'jeans',
        description: 'Light wash vintage-style low-rise flare bootcut jeans with seam detailing and retro cut',
      },
      {
        file: 'Ekran görüntüsü 2026-05-21 175646.png',
        name: 'Taupe Autry Vintage Retro Sneakers',
        type: 'shoes',
        colorTag: 'beige',
        itemTag: 'sneakers',
        description: 'Taupe sand Autry vintage retro running sneakers with mesh and suede upper',
      },
    ],
  },
  {
    folder: 'Yeni klasör (20) - Kopya',
    title: 'Olive Marble Mesh Halter Wide-Leg Utility Jeans Black Converse',
    slug: 'olive-marble-mesh-halter-wide-leg-utility-jeans',
    description: 'A relaxed retro look featuring an olive and earth-tone marble print mesh halter crop top paired with light wash wide-leg utility pocket jeans and black Converse Chuck Taylor high tops. The abstract print and wide-leg silhouette channel \'70s-inspired casual cool.',
    style: 'retro-vintage',
    season: 'summer',
    occasion: 'casual',
    occasions: [],
    featured: false,
    tags: ['retro', 'mesh', 'wide-leg jeans', 'converse', 'vintage 70s'],
    mainImage: 'fashn-export-1779589943944.webp',
    mainImageAlt: 'Retro vintage outfit with olive marble mesh halter top, wide-leg utility jeans, and black Converse',
    pieces: [
      {
        file: 'Ekran görüntüsü 2026-05-22 031234.png',
        name: 'Olive Marble Print Mesh Halter Crop Top',
        type: 'top',
        colorTag: 'khaki',
        itemTag: 'blouse',
        description: 'Olive and earth-tone marble print mesh halter crop top with deep V-neck and ruched body',
      },
      {
        file: 'Ekran görüntüsü 2026-05-22 035047.png',
        name: 'Light Wash Wide-Leg Utility Pocket Jeans',
        type: 'bottom',
        colorTag: 'blue',
        itemTag: 'jeans',
        description: 'Light wash wide-leg jeans with oversized patch pockets and a relaxed utility silhouette',
      },
      {
        file: 'Ekran görüntüsü 2026-05-21 173524.png',
        name: 'Black Converse Chuck Taylor High Tops',
        type: 'shoes',
        colorTag: 'black',
        itemTag: 'sneakers',
        description: 'Black Converse Chuck Taylor All Star high top canvas sneakers, a timeless retro staple',
      },
    ],
  },
]

async function main() {
  console.log(`Starting upload of ${OUTFITS.length} Retro & Vintage outfits...\n`)

  for (let outfitIndex = 0; outfitIndex < OUTFITS.length; outfitIndex++) {
    const outfit = OUTFITS[outfitIndex]
    const folderPath = join(BASE, outfit.folder)
    console.log(`\n[${outfitIndex + 1}/${OUTFITS.length}] ${outfit.title}`)

    // Upload main image
    const mainImagePath = join(folderPath, outfit.mainImage)
    console.log(`  Uploading main image: ${outfit.mainImage}`)
    const mainAsset = await uploadImage(mainImagePath)
    if (!mainAsset) {
      console.error(`  SKIP: Failed to upload main image for "${outfit.title}"`)
      continue
    }

    // Upload piece images
    const uploadedPieces = []
    for (const piece of outfit.pieces) {
      const piecePath = join(folderPath, piece.file)
      console.log(`  Uploading piece: ${piece.name} (${piece.file})`)
      const pieceAsset = await uploadImage(piecePath)
      await sleep(500)
      if (pieceAsset) {
        uploadedPieces.push({ ...piece, assetId: pieceAsset._id })
      }
    }

    // Create Sanity document
    const doc = {
      _type: 'outfit',
      title: outfit.title,
      slug: { _type: 'slug', current: outfit.slug },
      description: outfit.description,
      style: outfit.style,
      season: outfit.season,
      occasion: outfit.occasion,
      occasions: outfit.occasions,
      featured: outfit.featured,
      tags: outfit.tags,
      publishedAt: new Date().toISOString(),
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: mainAsset._id },
        alt: outfit.mainImageAlt,
        hotspot: { x: 0.5, y: 0.3, height: 0.6, width: 0.6 },
      },
      pieces: uploadedPieces.map((piece, idx) => ({
        _key: `piece-rv-${outfitIndex}-${idx}`,
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
      const created = await client.create(doc)
      console.log(`  ✓ Created: ${created._id} (${uploadedPieces.length} pieces)`)
    } catch (err) {
      console.error(`  ✗ Failed to create document: ${err.message}`)
    }

    await sleep(1000)
  }

  console.log('\n✓ All done!')
}

main().catch(console.error)
