# Stylefinden

Fashion discovery platform for outfits, hairstyles, accessories, blogs and style guides.

## Tech Stack

- **Framework:** Next.js 16.2.2 (App Router)
- **Styling:** Tailwind CSS
- **Images:** Cloudinary + `next/image`
- **Analytics:** Google Analytics 4
- **Deployment:** Vercel

## Project Structure

```text
src/
├── app/          # Pages and routes
├── components/   # Reusable UI components
└── public/       # Static assets
```

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Newsletter + New Post Mail Setup

Required environment variables:

```bash
RESEND_API_KEY=...
RESEND_AUDIENCE_ID=...
RESEND_FROM_EMAIL="Stylefinden <updates@yourdomain.com>"
SANITY_WEBHOOK_SECRET=...
NEXT_PUBLIC_SITE_URL=https://stylefinden.com
```

Sanity webhook setup:

- URL: `https://stylefinden.com/api/revalidate`
- Method: `POST`
- Header: `x-webhook-secret: <SANITY_WEBHOOK_SECRET>`
- Dataset events: include at least `post` publish events
- Payload should include: `_type`, `_id`, `title`, `slug`, `category`, `transition` (recommended)

## License

All rights reserved © Stylefinden
