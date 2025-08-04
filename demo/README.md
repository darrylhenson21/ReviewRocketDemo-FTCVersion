# Review Rocket Demo

A lightweight, static demo application showcasing the Review Rocket customer feedback flow. This demo allows prospects to experience the complete review funnel and includes lead capture functionality for business inquiries.

## 🚀 Features

- **Star Rating System**: Interactive 1-5 star rating with visual feedback
- **Smart Routing**: Low ratings (≤3) go to feedback page, high ratings (≥4) go to thank-you page
- **Lead Capture**: Business inquiry form with auto-prefilling from demo data
- **Explainer Tooltips**: Interactive help bubbles explaining demo functionality
- **CTA Panels**: Call-to-action sections encouraging business sign-ups
- **Configurable Branding**: Easy customization via single config file
- **Mobile-First Design**: Responsive layout optimized for all devices
- **Session Storage**: Remembers user data between pages for seamless experience
- **Bot Protection**: Honeypot fields to prevent spam submissions
- **No Backend Required**: Pure client-side JavaScript with optional webhook integration
- **Vercel Ready**: Optimized for static deployment

## 📁 Project Structure

```
/demo
  index.html              # Main rating page
  feedback.html           # Low rating feedback page  
  thank-you.html          # High rating thank-you page
  lead-form.html          # Business inquiry lead capture form
  /api
    send-lead.js          # Vercel serverless function for email notifications
  /src
    config.js             # All configuration and branding
    main.js               # Core application logic
    ui.css                # Complete styling and responsive design
  /public
    logo.svg              # Business logo placeholder
  package.json            # Dependencies for serverless functions
  vercel.json             # Static hosting configuration
  .env.example            # Environment variables template
  README.md               # This file
```

## 🚀 Quick Start

### Local Development
1. Clone or download the project
2. Navigate to the `/demo` folder
3. Run a local server: `python -m http.server 5000` or `npx serve`
4. Open `http://localhost:5000`

### Vercel Deployment with Email Notifications

1. **Set Up Email (Recommended)**
   - Get SMTP credentials from your email provider:
     - **Gmail**: Enable 2FA and create an app password
     - **Outlook**: Use your regular email and password  
     - **Custom**: Get SMTP settings from your provider

2. **Deploy to Vercel**
   - Push code to GitHub or upload directly to Vercel
   - Connect your repository to Vercel
   - Set environment variables in Vercel dashboard:
     - `SMTP_HOST`: Your email provider's SMTP server
     - `SMTP_USER`: Your email address
     - `SMTP_PASS`: Your email password or app password
     - `OWNER_EMAIL`: Where to send lead notifications
     - `FROM_EMAIL`: Address to send emails from

3. **Test the System**
   - Visit your deployed demo
   - Fill out the rating form with name/email
   - Click "Get Started Today" and submit the lead form
   - Check your email for both owner notification and lead confirmation

4. **Alternative: Function Logs Only**
   - Deploy without SMTP configuration
   - View lead details in Vercel function logs
   - Perfect for testing or simple setups

## ⚙️ Configuration

### Branding & Content
Edit `src/config.js` to customize:
- Business name and colors
- All text content and messaging
- Logo path and external review URL
- Feature flags (explainers, CTA panels)

### Lead Notifications
Modify `api/send-lead.js` to customize:
- Console log format and content
- Webhook data structure
- Lead data processing and validation

### Form Integration
To use external form services instead of the built-in system:
1. Update `config.cta.link` to your form URL
2. Adjust `config.formPrefillMap` for your form's field names
3. Disable the serverless function by setting `leadCaptureUrl: ""`

## 📧 Email Notifications

When someone submits the lead form, you'll automatically receive:

### Owner Notification Email
Professional email with complete lead details:
- Contact information (name, email, phone, business)
- Business details (industry, customer volume, message)
- Demo activity tracking (original name/email used)
- Formatted table layout for easy reading

### Lead Confirmation Email  
Automatic confirmation sent to the prospect:
- Professional thank-you message
- Next steps and follow-up information
- Link back to demo for sharing
- Branded business communication

### Backup Methods

**Function Logs (Always Available)**:
- Complete lead details logged to Vercel console
- Structured format for easy reading
- Perfect backup if email fails

**Webhook Integration (Optional)**:
- Set `WEBHOOK_URL` for additional integrations
- Send to Zapier, Make.com, or custom endpoints
- Integrate with CRM systems or other tools

## 🔧 Email Setup Guide

### Gmail Setup
1. Enable 2-Factor Authentication
2. Generate an App Password (not your regular password)
3. Use these settings:
   - `SMTP_HOST=smtp.gmail.com`
   - `SMTP_PORT=587`
   - `SMTP_USER=your-email@gmail.com`
   - `SMTP_PASS=your-app-password`

### Outlook/Hotmail Setup  
1. Use your regular email credentials
2. Use these settings:
   - `SMTP_HOST=smtp-mail.outlook.com`
   - `SMTP_PORT=587`
   - `SMTP_USER=your-email@outlook.com`
   - `SMTP_PASS=your-password`

### Custom Email Provider
1. Get SMTP settings from your provider
2. Use your provider's SMTP server and port
3. Set appropriate security settings

## 🔒 Security Features

- **Bot Protection**: Honeypot fields prevent spam submissions
- **Input Validation**: Server-side validation of all form data
- **Environment Variables**: Sensitive data stored securely
- **Error Handling**: Graceful failure without exposing internals

