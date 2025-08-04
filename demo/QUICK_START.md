# Review Rocket Demo - Quick Start

## What You Have
A complete Review Rocket demo with professional email notifications using Gmail.

## Ready to Deploy?

### 1. Get Your Gmail Ready (2 minutes)
- Enable 2-Factor Authentication in your Google Account
- Generate an App Password for "Mail" → "Other: Review Rocket Demo"
- Copy the 16-character password (no spaces/dashes)

### 2. Deploy to Vercel (5 minutes)
- Connect this repo to Vercel
- Add these environment variables:
  ```
  SMTP_HOST=smtp.gmail.com
  SMTP_PORT=587
  SMTP_SECURE=false
  SMTP_USER=your-email@gmail.com
  SMTP_PASS=your-16-char-app-password
  OWNER_EMAIL=your-email@gmail.com
  FROM_EMAIL=your-email@gmail.com
  ```
- Deploy!

### 3. Test It (1 minute)
- Visit your demo URL
- Rate with 5 stars, enter your name/email
- Click "Get Started Today"
- Fill out the business form and submit
- Check your Gmail for the lead notification!

## Files You Can Customize

### `src/config.js` - All Branding & Content
Change business name, colors, text, logo path - everything visual.

### `public/logo.svg` - Your Logo
Replace with your business logo.

### `api/send-lead.js` - Email Templates
Customize the email content and styling.

## That's It!
Your demo is ready to show prospects and capture leads automatically.

---

**Need help?** Check GMAIL_SETUP.md for detailed Gmail instructions or README.md for full documentation.