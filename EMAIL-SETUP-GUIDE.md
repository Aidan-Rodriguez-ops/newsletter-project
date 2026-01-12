# Email Subscription Setup Guide

## What Was Built

✅ **Newsletter Subscription System** - Users can subscribe to receive email updates
✅ **Subscribers Database** - Supabase table to store subscriber information
✅ **Email Sending** - Integration with Resend for sending emails
✅ **Welcome Emails** - Automatic confirmation emails to new subscribers
✅ **Unsubscribe Functionality** - Easy opt-out for users

---

## Setup Steps

### Step 1: Run Database Setup Script

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Navigate to **SQL Editor**
3. Open the file `database-subscribers.sql` in this project
4. Copy all the SQL and paste it into the Supabase SQL Editor
5. Click **Run** to execute the script

This will create:
- `subscribers` table with email management
- RLS policies for public subscriptions
- Triggers for tracking subscription changes

### Step 2: Sign Up for Resend (Free Email Service)

1. Go to https://resend.com
2. Sign up for a free account (3,000 emails/month free)
3. Verify your email address
4. In the Resend Dashboard, go to **API Keys**
5. Click **Create API Key**
6. Give it a name like "Newsletter Project"
7. Copy the API key

### Step 3: Add Environment Variables

Add these to your `.env.local` file:

```env
# Resend API Key
RESEND_API_KEY=re_your_api_key_here

# Your app URL (for unsubscribe links)
NEXT_PUBLIC_APP_URL=http://localhost:3002
```

**IMPORTANT:** Also add these to Vercel when you deploy:
- Go to your Vercel project settings
- Navigate to **Environment Variables**
- Add `RESEND_API_KEY` with your Resend API key
- Add `NEXT_PUBLIC_APP_URL` with your production URL (e.g., `https://your-site.vercel.app`)

### Step 4: Configure Resend Domain (Optional but Recommended)

By default, Resend uses `onboarding@resend.dev` as the sender. To use your own domain:

1. In Resend Dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `yourdomain.com`)
4. Add the DNS records provided by Resend to your domain registrar
5. Wait for verification (usually takes a few minutes)
6. Update the `from` field in `/src/app/api/subscribe/route.ts`:
   ```typescript
   from: 'Main Line Briefing Room <newsletter@yourdomain.com>',
   ```

### Step 5: Test the Subscription

1. Restart your dev server: `npm run dev`
2. Go to your homepage
3. Enter your email in the subscription form
4. Click "Subscribe"
5. Check your email for the welcome message!

---

## How It Works

### Subscription Flow

1. User enters email on your website
2. System checks if email already exists
3. If new: Creates subscriber record and sends welcome email
4. If existing but unsubscribed: Reactivates subscription
5. If already subscribed: Shows friendly message

### Email Features

- **Welcome Email**: Sent when new user subscribes
- **Resubscribe Email**: Sent when previous subscriber returns
- **Unsubscribe Link**: Included in all emails for easy opt-out

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

**Response:**
```json
{
  "success": true,
  "message": "Successfully subscribed! Check your email for confirmation."
}
```

---

## Database Schema

### `subscribers` table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| email | TEXT | Subscriber email (unique) |
| subscribed | BOOLEAN | Subscription status |
| subscribed_at | TIMESTAMP | When they subscribed |
| unsubscribed_at | TIMESTAMP | When they unsubscribed (if applicable) |
| preferences | JSONB | Email preferences (articles, market updates) |
| created_at | TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | Last update time |

---

## Sending Newsletter Emails

To send newsletters to all subscribers, you'll create a separate API endpoint or admin function. Here's a simple example you can add later:

```typescript
// Example: Send newsletter to all subscribers
const { data: subscribers } = await supabase
  .from('subscribers')
  .select('email')
  .eq('subscribed', true)

for (const subscriber of subscribers) {
  await resend.emails.send({
    from: 'Main Line Briefing Room <newsletter@yourdomain.com>',
    to: subscriber.email,
    subject: 'Your Weekly Market Brief',
    html: emailTemplate
  })
}
```

---

## Troubleshooting

### Emails not sending

- Check that `RESEND_API_KEY` is set correctly in `.env.local`
- Verify your Resend account is active
- Check Resend dashboard logs for any errors
- Make sure you haven't exceeded the 3,000 email/month limit

### "Invalid API key" error

- Regenerate your API key in Resend dashboard
- Update `.env.local` with the new key
- Restart your dev server

### Subscribers not being added

- Run the database setup script in Supabase
- Check Supabase logs for RLS policy errors
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set correctly

---

## Next Steps

1. ✅ Complete all setup steps above
2. ✅ Test the subscription form
3. ✅ Verify you receive the welcome email
4. 📧 Create email templates for article notifications
5. 📧 Set up automated emails when new articles are published
6. 📧 Add unsubscribe page

---

## Cost

- **Resend Free Tier**: 3,000 emails/month ($0)
- **Resend Pro**: $20/month for 50,000 emails (upgrade when needed)
- **Supabase**: Already included in your free tier

---

**Your newsletter subscription system is ready to use!** 🎉
