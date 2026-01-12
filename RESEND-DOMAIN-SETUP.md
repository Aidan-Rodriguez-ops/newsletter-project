# Resend Email Domain Setup

## Current Limitation

The `onboarding@resend.dev` testing domain can **only send emails to the email address you used to sign up for Resend**. This is a Resend limitation for testing purposes.

## Your Options

### Option 1: Test with Your Own Email (Current Setup)

**Current behavior:**
- Subscription form saves email to database ✅
- Email is only sent if the subscriber email matches your Resend account email
- For other emails, subscription still works but email won't be sent

**To test:**
1. Use your Resend account email address (the one you signed up with)
2. Subscribe on your site
3. Check your inbox for the welcome email

### Option 2: Verify a Custom Domain (Recommended for Production)

To send emails to any subscriber, you need to verify a domain you own.

**Steps:**

1. **Go to Resend Dashboard**
   - Visit https://resend.com/domains
   - Click "Add Domain"

2. **Add Your Domain**
   - Enter your domain (e.g., `mainlinebriefingroom.com`)
   - Click "Add"

3. **Add DNS Records**
   Resend will provide you with DNS records. Add these to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.):
   - SPF record (TXT)
   - DKIM record (TXT)
   - DMARC record (TXT)

4. **Wait for Verification**
   - Usually takes 5-30 minutes
   - Resend will automatically verify once DNS propagates

5. **Update Environment Variables**

   In `.env.local`:
   ```env
   RESEND_FROM_EMAIL=Main Line Briefing Room <newsletter@yourdomain.com>
   ```

   In Vercel:
   - Add the same `RESEND_FROM_EMAIL` environment variable
   - Redeploy

### Option 3: Use a Free Subdomain

If you don't own a domain yet, you can:

1. Get a free domain from:
   - Vercel (yoursite.vercel.app - but can't add custom DNS records)
   - Freenom (.tk, .ml, .ga domains)
   - Use a subdomain from a domain you already own

2. Follow the same verification steps as Option 2

## Current Configuration

Your `.env.local` now has:
```env
RESEND_FROM_EMAIL=Main Line Briefing Room <onboarding@resend.dev>
```

When you verify a domain, update it to:
```env
RESEND_FROM_EMAIL=Main Line Briefing Room <newsletter@yourdomain.com>
```

## Testing Strategy

**For now (using resend.dev):**
- Test subscriptions with your own email address
- Verify database storage is working
- Check that emails are sent successfully to your address

**After domain verification:**
- Update `RESEND_FROM_EMAIL` environment variable
- Redeploy on Vercel
- Test with any email address

## Common DNS Record Example

When you verify your domain, Resend will give you records like this:

```
Type: TXT
Name: resend._domainkey
Value: p=MIGfMA0GCSqGSIb3DQEBAQUAA4GN...

Type: TXT
Name: @
Value: v=spf1 include:_spf.resend.com ~all

Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com
```

Add these in your domain registrar's DNS settings.

## Cost

- **Resend Free Tier**: 3,000 emails/month (includes custom domains)
- **No additional cost** for domain verification

---

**Need help?** Check out:
- Resend documentation: https://resend.com/docs/dashboard/domains/introduction
- Resend support: support@resend.com
