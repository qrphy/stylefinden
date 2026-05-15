const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://stylefinden.com'

const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/stylefinden',
  pinterest: 'https://pinterest.com/stylefinden',
  tiktok: 'https://tiktok.com/@stylefinden',
}

type EmailOptions = {
  previewText?: string
  body: string
  unsubscribeEmail?: string
}

export function buildEmailHtml({ previewText, body, unsubscribeEmail }: EmailOptions): string {
  const preview = previewText
    ? `<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${previewText}&nbsp;&#8203;</div>`
    : ''

  const unsubscribeUrl = unsubscribeEmail
    ? `${SITE_URL}/api/unsubscribe?email=${encodeURIComponent(unsubscribeEmail)}`
    : `${SITE_URL}/unsubscribed`

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
</head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  ${preview}
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0f0;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;">

        <!-- Header: Brand name only -->
        <tr>
          <td style="background:#ffffff;padding:28px 40px;border-bottom:1px solid #eeeeee;">
            <a href="${SITE_URL}" style="text-decoration:none;">
              <span style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:20px;font-weight:900;color:#000000;letter-spacing:4px;text-transform:uppercase;">STYLEFINDEN</span>
            </a>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px 40px 32px;">
            ${body}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:0;background:#ffffff;border-top:1px solid #eeeeee;">

            <table width="100%" cellpadding="0" cellspacing="0">

              <!-- Footer brand: logo + name + tagline -->
              <tr>
                <td style="padding:32px 40px 24px;text-align:center;border-bottom:1px solid #f0f0f0;">
                  <a href="${SITE_URL}" style="text-decoration:none;display:inline-block;">
                    <img src="${SITE_URL}/stylefinden-logo.png" width="64" height="64" alt="Stylefinden" style="display:block;margin:0 auto 12px;" />
                    <span style="display:block;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:18px;font-weight:900;color:#000000;letter-spacing:3px;text-transform:uppercase;margin-bottom:6px;">STYLEFINDEN</span>
                    <span style="display:block;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:9px;font-weight:400;color:#aaaaaa;letter-spacing:5px;text-transform:uppercase;">YOUR STYLE. YOUR IDENTITY.</span>
                  </a>
                </td>
              </tr>

              <!-- Social: Follow Us! -->
              <tr>
                <td style="padding:28px 40px 20px;text-align:center;">
                  <p style="margin:0 0 14px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#000000;">Follow Us!</p>
                  <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
                    <tr>
                      <td style="padding:0 5px;">
                        <a href="${SOCIAL_LINKS.instagram}" style="display:inline-block;border:1px solid #000000;color:#000000;text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:9px;font-weight:600;letter-spacing:2px;text-transform:uppercase;padding:7px 13px;">Instagram</a>
                      </td>
                      <td style="padding:0 5px;">
                        <a href="${SOCIAL_LINKS.pinterest}" style="display:inline-block;border:1px solid #000000;color:#000000;text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:9px;font-weight:600;letter-spacing:2px;text-transform:uppercase;padding:7px 13px;">Pinterest</a>
                      </td>
                      <td style="padding:0 5px;">
                        <a href="${SOCIAL_LINKS.tiktok}" style="display:inline-block;border:1px solid #000000;color:#000000;text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:9px;font-weight:600;letter-spacing:2px;text-transform:uppercase;padding:7px 13px;">TikTok</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Copyright + Legal + Unsubscribe -->
              <tr>
                <td style="padding:16px 40px 28px;text-align:center;border-top:1px solid #f0f0f0;">
                  <p style="margin:0 0 6px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:10px;color:#999999;letter-spacing:0;">
                    &copy; 2026 Stylefinden. All rights reserved.
                  </p>
                  <p style="margin:0;font-size:10px;color:#bbbbbb;">
                    <a href="${SITE_URL}/legal" style="color:#bbbbbb;text-decoration:none;">Legal Notice</a>
                    &nbsp;&middot;&nbsp;
                    <a href="${SITE_URL}/privacy" style="color:#bbbbbb;text-decoration:none;">Privacy Policy</a>
                    &nbsp;&middot;&nbsp;
                    <a href="${unsubscribeUrl}" style="color:#bbbbbb;text-decoration:underline;">Unsubscribe</a>
                  </p>
                </td>
              </tr>

            </table>

          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export function buildWelcomeEmail(unsubscribeEmail: string): { html: string; text: string } {
  const html = buildEmailHtml({
    previewText: 'Welcome to Stylefinden — your style updates start now.',
    unsubscribeEmail,
    body: `
      <p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#999;margin:0 0 20px;">You&apos;re in.</p>
      <h1 style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:28px;font-weight:900;color:#000;margin:0 0 20px;line-height:1.2;">
        Welcome to Stylefinden ✦
      </h1>
      <p style="font-size:14px;color:#444;line-height:1.8;margin:0 0 16px;">
        You&apos;re now on our list. Expect fresh outfit ideas, hairstyle inspiration, and curated style updates — no fluff, no spam.
      </p>
      <p style="font-size:14px;color:#444;line-height:1.8;margin:0 0 32px;">
        While you wait for the next update, explore what&apos;s already live:
      </p>
      <table cellpadding="0" cellspacing="0" style="margin-bottom:36px;">
        <tr>
          <td style="padding-right:12px;">
            <a href="${SITE_URL}/outfits" style="display:inline-block;background:#000;color:#fff;text-decoration:none;font-size:11px;letter-spacing:2px;text-transform:uppercase;padding:13px 28px;">Outfits</a>
          </td>
          <td style="padding-right:12px;">
            <a href="${SITE_URL}/blog" style="display:inline-block;border:1px solid #000;color:#000;text-decoration:none;font-size:11px;letter-spacing:2px;text-transform:uppercase;padding:13px 28px;">Blog</a>
          </td>
          <td>
            <a href="${SITE_URL}/trends" style="display:inline-block;border:1px solid #000;color:#000;text-decoration:none;font-size:11px;letter-spacing:2px;text-transform:uppercase;padding:13px 28px;">Trends</a>
          </td>
        </tr>
      </table>
      <p style="font-size:13px;color:#888;line-height:1.6;margin:0;">
        See you in your inbox,<br/>
        <strong style="color:#000;">The Stylefinden Team</strong>
      </p>
    `,
  })

  const text = `Welcome to Stylefinden ✦\n\nYou're now on our list. Expect fresh outfit ideas, hairstyle inspiration, and curated style updates.\n\nExplore: ${SITE_URL}\n\nUnsubscribe: ${SITE_URL}/api/unsubscribe?email=${encodeURIComponent(unsubscribeEmail)}`

  return { html, text }
}

export function buildBlogNotificationEmail(options: {
  title: string
  postUrl: string
  category?: string
}): { html: string; text: string; subject: string; previewText: string } {
  const { title, postUrl, category } = options

  const categoryLine = category
    ? `<p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#999;margin:0 0 16px;">${category}</p>`
    : `<p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#999;margin:0 0 16px;">New Article</p>`

  const html = buildEmailHtml({
    previewText: `New on Stylefinden: ${title}`,
    body: `
      ${categoryLine}
      <h1 style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:28px;font-weight:900;color:#000;margin:0 0 20px;line-height:1.25;">
        ${title}
      </h1>
      <p style="font-size:14px;color:#555;line-height:1.8;margin:0 0 36px;">
        A new article is live on Stylefinden. Click below to read it.
      </p>
      <a href="${postUrl}" style="display:inline-block;background:#000;color:#fff;text-decoration:none;font-size:11px;letter-spacing:2px;text-transform:uppercase;padding:14px 32px;">
        Read the Article &rarr;
      </a>
      <p style="font-size:12px;color:#bbb;margin:36px 0 0;">
        You&apos;re receiving this because you subscribed to Stylefinden updates.
      </p>
    `,
  })

  const text = `${title}\n\nA new article is live on Stylefinden.\n\n${postUrl}`
  const subject = `New on Stylefinden: ${title}`
  const previewText = `New on Stylefinden: ${title}`

  return { html, text, subject, previewText }
}
