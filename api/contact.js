import { Resend } from 'resend';

// Basic spam/bot protection
const recentSubmissions = new Map();
const COOLDOWN_MS = 30 * 1000; // 30 seconds between submissions from same IP

function isSpam(ip) {
  const last = recentSubmissions.get(ip);
  if (last && Date.now() - last < COOLDOWN_MS) return true;
  recentSubmissions.set(ip, Date.now());
  return false;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ??
    req.socket?.remoteAddress ??
    'unknown';

  if (isSpam(ip)) {
    return res.status(429).json({ error: 'Please wait before sending another message.' });
  }

  const { name, email, message } = req.body ?? {};

  // Validate
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'name, email, and message are required.' });
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  // Sanitise lengths
  if (name.length > 100 || email.length > 200 || message.length > 2000) {
    return res.status(400).json({ error: 'Input too long.' });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.error('[api/contact] RESEND_API_KEY not set');
    return res.status(500).json({ error: 'Email service not configured.' });
  }

  const resend = new Resend(resendKey);

  try {
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Replace with your verified domain once set up
      to: ['230443370@mycput.ac.za'],
      replyTo: email,
      subject: `Portfolio enquiry from ${name}`,
      html: `
        <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f8fafc; border-radius: 12px;">
          <div style="background: linear-gradient(135deg, #3b82f6, #a855f7); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; font-size: 18px;">New Portfolio Message</h1>
          </div>
          <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <p style="margin: 0 0 12px; color: #64748b; font-size: 14px;"><strong style="color: #1e293b;">From:</strong> ${name}</p>
            <p style="margin: 0 0 12px; color: #64748b; font-size: 14px;"><strong style="color: #1e293b;">Email:</strong> <a href="mailto:${email}" style="color: #3b82f6;">${email}</a></p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;">
            <p style="margin: 0 0 8px; color: #1e293b; font-size: 14px; font-weight: 600;">Message:</p>
            <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #94a3b8; font-size: 12px; margin-top: 16px; text-align: center;">Sent via malakakatlego.vercel.app</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[api/contact]', err);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
}
