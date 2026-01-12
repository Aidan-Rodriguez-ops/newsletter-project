# SendGrid Email Setup Guide

Your newsletter subscription system has been migrated from Resend to SendGrid! This guide will help you get everything working.

## What Changed

✅ **Removed:** Resend package and configuration
✅ **Added:** SendGrid (@sendgrid/mail)
✅ **Updated:** Subscribe API route to use SendGrid
✅ **Updated:** Environment variables for SendGrid

---

## Setup Steps (5 minutes)

### Step 1: Create SendGrid Account

1. Go to https://sendgrid.com
2. Click **"Start for free"**
3. Sign up with any email (doesn't have to be your Gmail)
4. Verify your email address

**Free Tier:** 100 emails/day (3,000/month) - Perfect for testing!

### Step 2: Create API Key

1. Log in to SendGrid Dashboard
2. Go to **Settings** → **API Keys** (https://app.sendgrid.com/settings/api_keys)
3. Click **"Create API Key"**
4. Name it: `Newsletter Project`
5. Choose **"Full Access"** (or at minimum, **Mail Send** permissions)
6. Click **"Create & View"**
7. **IMPORTANT:** Copy the API key NOW (you won't see it again!)

### Step 3: Verify Sender Email Address

This is the KEY step that makes SendGrid work with your Gmail!

1. In SendGrid Dashboard, go to **Settings** → **Sender Authentication**
2. Click **"Verify a Single Sender"**
3. Fill out the form:
   - **From Name:** Main Line Briefing Room
   - **From Email Address:** mainlinebriefingroom@gmail.com
   - **Reply To:** mainlinebriefingroom@gmail.com
   - **Address, City, State, ZIP, Country:** Your info (required by law)
   - **Nickname:** Newsletter (just for your reference)
4. Click **"Create"**
5. **Check your Gmail inbox** (mainlinebriefingroom@gmail.com)
6. Click the verification link in the email from SendGrid
7. You'll see: "Sender email verified!"

**That's it!** No domain needed, no 2FA required. SendGrid can now send emails from your Gmail address.

### Step 4: Add Environment Variables

Update your `.env.local` file (replace the placeholder):

```env
# SendGrid API Key for sending emails
SENDGRID_API_KEY=SG.your_actual_api_key_here

# Email from address (must match verified sender)
SENDGRID_FROM_EMAIL=mainlinebriefingroom@gmail.com
```

**Also add to Vercel:**
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these variables:
   - `SENDGRID_API_KEY` = `SG.your_actual_api_key_here`
   - `SENDGRID_FROM_EMAIL` = `mainlinebriefingroom@gmail.com`
4. Redeploy your application

### Step 5: Test It!

1. Restart your dev server (if running):
   ```bash
   npm run dev
   ```

2. Go to your homepage: http://localhost:3002

3. Enter an email address in the subscription form

4. Click **"Subscribe"**

5. Check the subscriber's inbox for the welcome email!

---

## How It Works

### Subscription Flow

1. User enters email on your website
2. System checks if email already exists in database
3. If new: Creates subscriber record and sends welcome email via SendGrid
4. If existing but unsubscribed: Reactivates subscription and sends welcome back email
5. If already subscribed: Shows friendly message

### Email Sending

- SendGrid handles all email delivery through their servers
- Emails appear to come from `mainlinebriefingroom@gmail.com`
- No access to your Gmail account needed
- Professional email infrastructure (SPF, DKIM, DMARC all handled)

---

## API Endpoints

### POST `/api/subscribe`

Subscribe a new email address.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Successfully subscribed! Check your email for confirmation."
}
```

**Response (Already Subscribed):**
```json
{
  "error": "This email is already subscribed to our newsletter",
  "status": 409
}
```

---

## Troubleshooting

### Emails not sending

**Check 1: API Key**
- Make sure `SENDGRID_API_KEY` is set in `.env.local`
- Verify the key starts with `SG.`
- Try regenerating the API key in SendGrid dashboard

**Check 2: Sender Verification**
- Go to SendGrid → Settings → Sender Authentication
- Make sure `mainlinebriefingroom@gmail.com` shows as **"Verified"**
- If not, click "Resend Verification Email"

**Check 3: SendGrid Dashboard**
- Go to **Activity** → **Activity Feed**
- Look for recent email attempts
- Check for any error messages

**Check 4: Server Logs**
- Look at your terminal/console for error messages
- Common errors:
  - `403 Forbidden` = API key issue
  - `403 Sender verification` = Email not verified

### "Sender not verified" error

You need to verify your sender email:
1. SendGrid Dashboard → Settings → Sender Authentication
2. Verify Single Sender
3. Check your Gmail for verification email
4. Click the link

### API Key not working

1. Go to SendGrid → Settings → API Keys
2. Delete the old key
3. Create a new one with **Full Access**
4. Update `.env.local` with the new key
5. Restart your dev server

### Emails going to spam

This is normal for new senders. To improve deliverability:
- SendGrid handles SPF/DKIM/DMARC automatically
- Ask test recipients to mark emails as "Not Spam"
- After a few successful sends, reputation improves
- For production, consider setting up domain authentication (optional)

---

## Subscription Features

### Current Features

✅ Email validation
✅ Duplicate detection
✅ Welcome emails for new subscribers
✅ Welcome back emails for returning subscribers
✅ Unsubscribe links in all emails
✅ Database storage with Supabase
✅ Graceful error handling (subscription still saves if email fails)

### Coming Soon

- Unsubscribe page
- Email preferences (articles, market updates)
- Automated article notification emails
- Admin dashboard to view subscribers

---

## SendGrid Free Tier Limits

- **100 emails/day** (3,000/month)
- Single sender verification (no domain required)
- Email API access
- Activity feed (7 days)
- Email validation

**When you need more:**
- SendGrid Essentials: $15/month for 50,000 emails
- SendGrid Pro: $90/month for 100,000 emails

---

## Database Schema

Your subscribers are stored in Supabase:

### `subscribers` table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| email | TEXT | Subscriber email (unique) |
| subscribed | BOOLEAN | Subscription status |
| subscribed_at | TIMESTAMP | When they subscribed |
| unsubscribed_at | TIMESTAMP | When they unsubscribed |
| preferences | JSONB | Email preferences |
| created_at | TIMESTAMP | Record creation |
| updated_at | TIMESTAMP | Last update |

---

## Next Steps

1. ✅ Complete all setup steps above
2. ✅ Verify sender email in SendGrid
3. ✅ Add API key to `.env.local`
4. ✅ Test subscription form locally
5. 🚀 Deploy to Vercel with environment variables
6. 📧 Build automated newsletter sending feature
7. 📧 Create unsubscribe page

---

## Cost Comparison

| Service | Free Tier | Domain Required | Setup Time |
|---------|-----------|-----------------|------------|
| **SendGrid** | 100/day | ❌ No | 5 minutes |
| Resend | 100/day | ✅ Yes | 15+ minutes |
| Gmail SMTP | 500/day | ❌ No | 10 minutes |
| Mailgun | 5,000/month (trial) | ✅ Yes | 15+ minutes |

**SendGrid is the best choice** for your use case: no domain required, quick setup, and professional infrastructure!

---

## Support

- **SendGrid Docs:** https://docs.sendgrid.com
- **SendGrid Support:** https://support.sendgrid.com
- **API Reference:** https://docs.sendgrid.com/api-reference/mail-send/mail-send

---

**Your newsletter is ready to go!** 🎉

Once you complete the setup steps above, you'll be able to send emails to any subscriber using your Gmail address through SendGrid's professional infrastructure.
