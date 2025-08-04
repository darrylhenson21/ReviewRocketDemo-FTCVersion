// Vercel serverless function for handling lead submissions
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  try {
    // Parse request body
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    
    // Validate required fields - allow either name or firstName+lastName
    const hasName = body.name || (body.firstName || body.lastName);
    if (!hasName) {
      return res.status(400).json({ ok: false, error: "Name is required" });
    }

    // Check for honeypot (bot protection)
    if (body._hp) {
      console.log("Bot detected, ignoring submission");
      return res.status(200).json({ ok: true }); // Return success to avoid revealing honeypot
    }

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE === "true" || true, // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Prepare lead data
    const leadName = body.name || `${body.firstName || ""} ${body.lastName || ""}`.trim();
    const leadEmail = body.email || "";
    const leadRating = body.rating || "";
    const leadSource = body.source || "unknown";
    const timestamp = new Date().toLocaleString();

    // Email to business owner
    const ownerEmailContent = `
=== NEW REVIEW ROCKET DEMO LEAD ===

Hey,
You’ve got a hot lead!
${leadName} just tested your Review Rocket demo and wants more info on setting this up for his business.
Here’s what he submitted:

Contact Information:
  Name: ${leadName}
  Email: ${leadEmail}

Demo Activity:
  Rating: ${leadRating ? leadRating + " stars" : "Not provided"}
  Source: ${leadSource}
  Submitted: ${timestamp}

Original Data:
${JSON.stringify(body, null, 2)}

================================
`;

    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.OWNER_EMAIL,
      subject: `New Review Rocket Demo Lead: ${leadName}`,
      text: ownerEmailContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #0ea5e9;">New Review Rocket Demo Lead</h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Contact Information</h3>
            <p><strong>Name:</strong> ${leadName}</p>
            <p><strong>Email:</strong> ${leadEmail}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Demo Activity</h3>
            <p><strong>Rating:</strong> ${leadRating ? leadRating + " stars" : "Not provided"}</p>
            <p><strong>Source:</strong> ${leadSource}</p>
            <p><strong>Submitted:</strong> ${timestamp}</p>
          </div>
          
          <p style="color: #666; font-size: 12px;">
            This lead was captured from the Review Rocket demo at ${req.headers.origin || "unknown origin"}.
          </p>
        </div>
      `
    });

    // Optional: Send confirmation email to prospect
    if (leadEmail && leadEmail.includes('@')) {
      try {
        await transporter.sendMail({
          from: process.env.FROM_EMAIL,
          to: leadEmail,
          subject: "Thanks for your interest in Review Rocket!",
          text: `Hi ${leadName},

Thanks for trying our Review Rocket demo! We'll be in touch soon with setup instructions and pricing details.

Best regards,
The Review Rocket Team`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px;">
              <h2 style="color: #0ea5e9;">Thanks for your interest in Review Rocket!</h2>
              
              <p>Hi ${leadName},</p>
              
              <p>Thanks for trying our Review Rocket demo! We'll be in touch soon with setup instructions and pricing details.</p>
              
              <p>Best regards,<br>
              The Review Rocket Team</p>
            </div>
          `
        });
      } catch (confirmError) {
        console.log("Failed to send confirmation email:", confirmError.message);
        // Don't fail the whole request if confirmation email fails
      }
    }

    console.log(`✅ Lead notification emails sent successfully for ${leadName}`);
    
    return res.status(200).json({ 
      ok: true, 
      success: true,
      message: "Lead captured successfully",
      lead: { name: leadName, email: leadEmail, timestamp }
    });

  } catch (error) {
    console.error("❌ Failed to send lead notification:", error);
    return res.status(500).json({ 
      ok: false, 
      error: "MAIL_FAIL",
      message: "Failed to process lead submission" 
    });
  }
}
