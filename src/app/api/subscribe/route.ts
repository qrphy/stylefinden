// Newsletter abonelik API'si — /api/subscribe POST endpoint'i.
// E-posta adresini doğrular ve Resend Audience'a ekler.
import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Resend request zamanında başlatılıyor — build sırasında env var yoksa crash etmez
  const resend = new Resend(process.env.RESEND_API_KEY);
  const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID!;

  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    await resend.contacts.create({
      email,
      audienceId: AUDIENCE_ID,
      unsubscribed: false,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[subscribe] Resend error:", err);
    return NextResponse.json({ error: "Subscription failed. Please try again." }, { status: 500 });
  }
}
