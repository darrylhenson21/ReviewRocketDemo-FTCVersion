# Local Testing with Email

## Quick Setup

The server is now running with nodemailer support. To test email functionality locally:

### Option 1: Environment Variables (Recommended)
Create a `.env` file in the demo folder:

```bash
cd demo
echo "SMTP_USER=your-email@gmail.com" > .env
echo "SMTP_PASS=your-app-password" >> .env
echo "OWNER_EMAIL=your-email@gmail.com" >> .env  
echo "FROM_EMAIL=your-email@gmail.com" >> .env
```

Then restart the server:
```bash
npm run dev
```

### Option 2: Edit server.js Directly
Open `server.js` and update the EMAIL_CONFIG section:

```javascript
const EMAIL_CONFIG = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your-actual-email@gmail.com',
    pass: 'your-16-char-app-password'
  }
};
```

## Testing Steps

1. **Configure Email** (using either option above)
2. **Restart Server** - You should see "✅ Configured for: your-email@gmail.com"
3. **Test the Demo**:
   - Go to http://localhost:5000
   - Rate with stars and enter name/email
   - Click "Get Started Today"
   - Fill out the simple form (just name/email)
   - Submit the form
4. **Check Results**:
   - Look at server console for lead details
   - Check your Gmail inbox for owner notification
   - Check the prospect's email for confirmation

## Gmail App Password Setup (If Needed)

1. Enable 2-Factor Authentication in Google Account
2. Go to Google Account → Security → App Passwords
3. Select "Mail" and "Other" 
4. Name it "Review Rocket Demo"
5. Copy the 16-character password (no spaces/dashes)
6. Use this password, NOT your regular Gmail password

## What You'll See

**Server Console:**
```
=== NEW REVIEW ROCKET DEMO LEAD ===
Contact Information:
  Name: John Smith
  Email: john@example.com
Demo Activity:
  Source: Business Inquiry Button
  Demo Name: John
  Demo Email: john@example.com
  Submitted: 7/23/2025, 11:50:00 AM
================================
✅ Lead notification emails sent successfully
```

**Owner Email:** Professional notification with lead details
**Prospect Email:** Confirmation email with next steps

Once this works locally, your Vercel deployment will work the same way!