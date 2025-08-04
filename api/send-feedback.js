import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // only accept POST
  if (req.method !== "POST") return res.status(405).end();

  const { type, name = "", email = "", feedback = "" } = req.body || {};

  // simple guard so random bots can’t reuse the endpoint
  if (type !== "private-feedback")
    return res.status(400).json({ ok: false, error: "TYPE_MISMATCH" });

  /* ── transporter: identical creds you fixed earlier ─────────── */
  const transporter = nodemailer.createTransport({
    host  : process.env.SMTP_HOST || "smtp.gmail.com",
    port  : 465,
    secure: true,
    auth  : {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  /* ── email to YOU (owner) ───────────────────────────────────── */
  const ownerMsg = {
    from   : process.env.FROM_EMAIL,
    to     : process.env.OWNER_EMAIL,
    subject: `⚠️  Private feedback from ${name || "visitor"}`,
    html   : `
      <h3>New Private Feedback</h3>
      <p><b>Name:</b> ${name || "—"}</p>
      <p><b>Email:</b> ${email || "—"}</p>
      <p><b>Message:</b><br>${feedback.replace(/\n/g, "<br>") || "—"}</p>
    `,
  };

  /* ── polite thank-you to the visitor (only if they left email) ─*/
  const visitorMsg = email
    ? {
        from   : process.env.FROM_EMAIL,
        to     : email,
        subject: "What Happens When Someone Leaves a 3-Star Review (Important)",
        html   : `<p>Hi ${name || ""},<br>
        
        I wanted to explain what just happened—and why it’s so important for protecting your business and staying compliant.
      🛑 When someone tries to leave a 3-star (or lower) review:
        <li>They’re politely redirected to a private feedback page (like the one you just saw).</li>
        <li>They’re asked what went wrong and how your business can make it right.</li>
        <li>They’re still given the option to leave a public review—because FTC guidelines require that.</li>
        <li>Most people choose to give you a second chance instead. ❤️</li>
</p>`,
      }
    : null;

  try {
    await transporter.sendMail(ownerMsg);
    if (visitorMsg) await transporter.sendMail(visitorMsg);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("❌ send-feedback error", err);
    return res.status(500).json({ ok: false, error: "EMAIL_FAIL" });
  }
}
