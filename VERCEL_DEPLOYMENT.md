# Vercel Deployment Guide

This guide shows how to deploy the Review Rocket demo to Vercel with working email notifications using nodemailer and serverless functions.

## Project Structure

```
/
├── api/
│   └── send-lead.js          # Vercel serverless function (Node runtime)
├── demo/                     # Static demo pages  
│   ├── index.html
│   ├── feedback.html
│   ├── thank-you.html
│   ├── lead-form.html
│   └── src/
│       ├── config.js
│       ├── main.js
│       └── ui.css
├── vercel.json               # Routing configuration
└── package.json              # Dependencies (nodemailer)
```

## Key Files

### `/api/send-lead.js`
- Vercel serverless function using Node.js runtime
- Handles POST requests to `/api/send-lead` 
- Uses nodemailer with Gmail SMTP
- Sends owner notification + prospect confirmation emails
- Includes bot protection and error handling

### `/vercel.json`
- Routes `/api/*` to serverless functions
- Routes all other paths to `/demo/*` static files
- Includes security headers

### `/demo/src/config.js`
- Updated with `leadCaptureUrl: "/api/send-lead"`
- CTA points back to `lead-form.html`

## Environment Variables (Required)

Set these in Vercel Dashboard → Project → Settings → Environment Variables:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=yourgmail@gmail.com
SMTP_PASS=your-app-password-here
FROM_EMAIL=yourgmail@gmail.com
OWNER_EMAIL=where-leads-go@yourcompany.com
```

### Gmail Setup
1. Enable 2FA on your Gmail account
2. Generate an App Password: Google Account → Security → App passwords
3. Use the app password (not your regular password) for `SMTP_PASS`

## Deployment Steps

1. **Push to GitHub** (or other Git provider)
2. **Connect to Vercel:**
   - Visit vercel.com
   - Import your repository
   - Vercel auto-detects the setup
3. **Add Environment Variables:**
   - In Vercel dashboard: Settings → Environment Variables
   - Add all 7 variables listed above
4. **Deploy:**
   - Vercel automatically deploys on Git push
   - Or manually trigger via dashboard

## Testing Checklist

After deployment:

1. **Test API endpoint:** Visit `https://yourapp.vercel.app/api/send-lead`
   - Should return: "Method Not Allowed" (405 status)
   - NOT a 404 or HTML page

2. **Test demo flow:**
   - Visit `https://yourapp.vercel.app`
   - Fill out rating form 
   - Submit with lead capture enabled
   - Check email for notifications

3. **Check function logs:**
   - Vercel Dashboard → Functions tab
   - View invocation logs and any errors

4. **Test lead form:**
   - Visit thank-you or feedback page
   - Click "Get Started Today"
   - Fill out lead form
   - Verify emails sent

## Troubleshooting

### API Returns 404
- Check `vercel.json` routing configuration
- Ensure `/api/send-lead.js` exists at project root

### Email Fails (500 Error)
- Check environment variables are set correctly
- Verify Gmail app password (not regular password)
- Check function logs in Vercel dashboard

### CORS Errors  
- Shouldn't happen (same-origin requests)
- If occurring, check your domain configuration

### Edge Runtime Error
- Nodemailer requires Node.js runtime
- Make sure `send-lead.js` doesn't export `config = { runtime: 'edge' }`

## Cost Considerations

**Vercel Free Tier includes:**
- 100GB bandwidth/month
- 1000 serverless function invocations/month  
- Perfect for demo purposes

**Gmail SMTP is free** for reasonable volumes.

## Production Recommendations

For high-volume production use:
- Consider dedicated email service (SendGrid, Mailgun)
- Implement rate limiting in serverless function
- Add more robust error handling and retry logic
- Set up monitoring/alerting for failed emails