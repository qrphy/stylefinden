const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://stylefinden.com'

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
    : null

  const footer = unsubscribeUrl
    ? `<p style="margin:0;font-size:11px;color:#aaa;text-align:center;">
         Don&apos;t want these emails?
         <a href="${unsubscribeUrl}" style="color:#aaa;text-decoration:underline;">Unsubscribe</a>
       </p>`
    : ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
</head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:Georgia,'Times New Roman',serif;">
  ${preview}
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0f0;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;">
        <tr>
          <td style="background:#000;padding:28px 40px;">
            <a href="${SITE_URL}" style="text-decoration:none;">
              <span style="font-family:Georgia,serif;font-size:18px;font-weight:900;color:#fff;letter-spacing:5px;text-transform:uppercase;">STYLEFINDEN</span>
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding:40px 40px 32px;">
            ${body}
          </td>
        </tr>
        <tr>
          <td style="padding:0 40px 32px;border-top:1px solid #eee;">
            <div style="padding-top:24px;">
              ${footer}
            </div>
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
      <h1 style="font-family:Georgia,serif;font-size:28px;font-weight:900;color:#000;margin:0 0 20px;line-height:1.2;">
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
      <h1 style="font-family:Georgia,serif;font-size:28px;font-weight:900;color:#000;margin:0 0 20px;line-height:1.25;">
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
