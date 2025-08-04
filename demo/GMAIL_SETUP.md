# Gmail Setup for Review Rocket Demo

## Quick Gmail Configuration

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Click "Security" in the left sidebar
3. Under "Signing in to Google", click "2-Step Verification"
4. Follow the setup process to enable 2FA

### Step 2: Generate App Password
1. In Google Account Security settings
2. Under "Signing in to Google", click "App passwords"
3. Select "Mail" as the app
4. Select "Other" as the device and name it "Review Rocket Demo"
5. Copy the 16-character password (format: xxxx-xxxx-xxxx-xxxx)

### Step 3: Set Environment Variables in Vercel
Add these exact variables to your Vercel deployment:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-character-app-password
OWNER_EMAIL=your-email@gmail.com
FROM_EMAIL=your-email@gmail.com
```

**Important Notes:**
- Use the app password, NOT your regular Gmail password
- Remove any spaces or dashes from the app password
- Both OWNER_EMAIL and FROM_EMAIL can be the same Gmail address

### Step 4: Test the System
1. Deploy your demo to Vercel
2. Visit the demo and fill out the rating form
3. Submit the business inquiry form
4. Check your Gmail inbox for:
   - Lead notification email (to you)
   - Check the prospect's email for confirmation (if you used a different email in the demo)

### Troubleshooting

**"Authentication failed" error:**
- Double-check you're using the app password, not your regular password
- Verify 2FA is enabled on your Google account
- Make sure there are no spaces in the app password

**"Connection refused" error:**
- Verify SMTP settings exactly match the values above
- Check that Vercel environment variables are saved and deployed

**Not receiving emails:**
- Check your Gmail spam folder
- Verify OWNER_EMAIL matches your Gmail address
- Check Vercel function logs for detailed error messages

### Security Notes
- App passwords are safer than using your main password
- Each app password is unique and can be revoked individually
- The demo only sends emails when someone submits the lead form
- All email credentials are stored securely in Vercel environment variables

## Alternative: Gmail API (Advanced)
For higher volume usage, consider upgrading to Gmail API instead of SMTP, but the SMTP method above works perfectly for demo purposes and moderate usage.