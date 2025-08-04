# Review Rocket Demo - Deployment Guide

## Overview
This guide explains how to deploy the Review Rocket demo with lead capture functionality. The system is designed to work without email service dependencies, using webhook notifications and function logs instead.

## Deployment Options

### Option 1: Full Email Integration (Recommended)
Complete automated email system with professional notifications.

1. **Get Email Credentials**
   
   **Gmail (Recommended)**:
   - Enable 2-Factor Authentication in Google Account
   - Go to App Passwords and generate a new password
   - Use the 16-character app password (not your regular password)

   **Outlook/Hotmail**:
   - Use your regular email credentials
   - No special setup required

   **Custom Provider**:
   - Get SMTP settings from your email provider
   - Most use port 587 with TLS encryption

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Set environment variables in Vercel dashboard:
     - `SMTP_HOST`: Email provider's SMTP server
     - `SMTP_USER`: Your email address
     - `SMTP_PASS`: Your password or app password
     - `OWNER_EMAIL`: Where to receive lead notifications
     - `FROM_EMAIL`: Address emails are sent from

3. **Test Email System**
   - Submit a test lead through your demo
   - Verify you receive the owner notification email
   - Check that the prospect receives a confirmation email

### Option 2: Function Logs Only
Perfect for getting started quickly without email setup.

1. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Deploy automatically with zero configuration
   - No environment variables required

2. **Access Lead Data**
   - Go to Vercel dashboard → Functions tab
   - View function logs to see complete lead details
   - Each submission creates a formatted log entry

### Option 3: Hybrid Approach
Combine email notifications with additional integrations.

1. **Set Up Email** (as in Option 1)
2. **Add Webhook Integration**
   - Set `WEBHOOK_URL` environment variable
   - Send data to Zapier, Make.com, or CRM systems
   - Get both email notifications and automated workflows

## Testing Your Deployment

1. **Visit Your Demo**
   - Go to your deployed Vercel URL
   - Fill out the star rating form
   - Provide name and email (these will prefill the lead form)

2. **Test Lead Capture**
   - Click "Get Started Today" button
   - Fill out the business inquiry form
   - Submit and verify notifications work

3. **Verify Data Collection**
   - Check Vercel function logs
   - Confirm webhook received data (if configured)
   - Test any downstream integrations

## Lead Data Structure

When someone submits a lead, you'll receive this data:

```json
{
  "timestamp": "7/23/2025, 11:30:00 AM",
  "contact": {
    "name": "John Smith",
    "email": "john@example.com",
    "phone": "555-0123",
    "business": "Smith's Restaurant"
  },
  "businessInfo": {
    "industry": "Restaurant/Food Service",
    "monthlyCustomers": "500-1000",
    "message": "Looking to improve online reviews"
  },
  "demoActivity": {
    "source": "Business Inquiry Button",
    "originalName": "John",
    "originalEmail": "john@example.com"
  }
}
```

## Customization

### Branding and Content
- Edit `src/config.js` for all text, colors, and URLs
- Replace `public/logo.svg` with your logo
- No code changes required

### Lead Processing
- Modify `api/send-lead.js` for custom integrations
- Add validation, data transformation, or external API calls
- Environment variables keep sensitive data secure

### Form Fields
- Update `lead-form.html` to add/remove form fields
- Adjust `api/send-lead.js` to handle new fields
- Use consistent naming for automatic processing

## Troubleshooting

### Common Issues

**Webhook Not Receiving Data**
- Verify `WEBHOOK_URL` environment variable is set correctly
- Check webhook service logs for errors
- Ensure webhook accepts POST requests with JSON

**Form Submission Errors**
- Check Vercel function logs for detailed error messages
- Verify all required fields are filled
- Confirm honeypot field is not being filled by bots

**Missing Lead Data**
- Check if form validation is passing
- Verify sessionStorage has name/email from demo
- Look for JavaScript console errors

### Debug Mode
To see detailed processing information:
1. Open browser developer tools
2. Submit a lead form
3. Check Network tab for API response
4. Review Console tab for client-side errors

## Security Features

- **Bot Protection**: Honeypot fields prevent automated spam
- **Input Validation**: Server-side validation of all form data  
- **Environment Variables**: Sensitive data stored securely
- **Error Handling**: Graceful failures without exposing internals

## Support

For deployment issues:
1. Check Vercel function logs for specific errors
2. Verify webhook service is receiving data
3. Test with a simple webhook service like webhook.site
4. Review this documentation for configuration steps

The system is designed to be simple and reliable - most issues are related to webhook configuration or environment variables.