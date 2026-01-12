# Admin Dashboard Setup Guide

## Overview
Your admin dashboard has been successfully implemented! This guide will walk you through the final setup steps to get everything running.

## What Was Built

✅ **Secure Admin Authentication** - Email/password login with Supabase Auth
✅ **Admin Dashboard** - Overview with article statistics and quick actions
✅ **Article Management** - Create, edit, publish/unpublish, and delete articles
✅ **Role-Based Access Control** - Only admin users can access the admin panel
✅ **Protected Routes** - Middleware ensures authentication on all admin routes
✅ **n8n Integration** - API key protected webhook for AI-generated articles

---

## Setup Steps

### Step 1: Run Database Setup Script

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Navigate to **SQL Editor**
3. Open the file `database-setup.sql` in this project
4. Copy all the SQL and paste it into the Supabase SQL Editor
5. Click **Run** to execute the script

This will create:
- `user_profiles` table with role management
- RLS policies for admin-only operations
- Triggers for automatic profile creation
- Updated articles table policies

### Step 2: Create Your Admin User

1. In Supabase Dashboard, go to **Authentication > Users**
2. Click **Add user** > **Create new user**
3. Enter your email and create a secure password
4. Click **Create user**
5. Copy the `user_id` from the newly created user

### Step 3: Promote User to Admin

1. Go back to **SQL Editor** in Supabase
2. Run this command (replace with your actual user_id):

```sql
UPDATE user_profiles
SET role = 'admin'
WHERE user_id = 'YOUR_USER_ID_HERE';
```

3. Verify by running:

```sql
SELECT u.email, up.role
FROM auth.users u
JOIN user_profiles up ON u.id = up.user_id
WHERE u.email = 'your-email@example.com';
```

You should see `role: admin` in the results.

### Step 4: Get Supabase Service Role Key

For the n8n integration to work, you need the service role key:

1. In Supabase Dashboard, go to **Project Settings > API**
2. Find the **service_role** key (NOT the anon key)
3. Click **Reveal** and copy it
4. Open `.env.local` in your project
5. Replace `YOUR_SERVICE_ROLE_KEY_HERE` with your actual service role key

**IMPORTANT:** Never commit the service role key to git! It's already in `.gitignore`.

### Step 5: Generate n8n API Key

Generate a secure random string for the n8n API key:

```bash
# On macOS/Linux:
openssl rand -base64 32

# Or use an online generator:
# https://www.random.org/strings/
```

Update `.env.local`:
```
N8N_API_KEY=your_generated_random_key_here
```

### Step 6: Restart Development Server

After updating `.env.local`, restart your dev server:

```bash
# Stop the current dev server (Ctrl+C)
# Then restart:
npm run dev
```

---

## Testing Your Admin Panel

### 1. Login Test

1. Navigate to: http://localhost:3002/admin/login
2. Enter your admin email and password
3. You should be redirected to the admin dashboard

### 2. Dashboard Test

- You should see article statistics (Total, Published, Drafts)
- Quick action buttons should be visible
- Recent articles list should appear

### 3. Create Article Test

1. Click **Create New Article**
2. Fill in the form:
   - Title: "Test Article"
   - Category: Choose any category
   - Content: "This is a test article"
   - Author: "Admin"
3. Click **Save as Draft**
4. You should be redirected to the articles list

### 4. Publish Article Test

1. In the articles list, find your test article
2. Click the **⋮** menu
3. Click **Publish**
4. The status should change to "published"
5. Check your homepage - the article should now appear!

### 5. Edit Article Test

1. Click on an article title or click **Edit** from the menu
2. Make changes to the content
3. Click **Save as Draft** or **Publish Now**
4. Verify changes were saved

### 6. Delete Article Test

1. Click the **⋮** menu on an article
2. Click **Delete**
3. Confirm the deletion
4. Article should disappear from the list

---

## n8n Integration Setup

### Update Your n8n Workflow

1. In your n8n workflow, find the HTTP Request node that posts to your API
2. Update the configuration:

**URL:**
```
http://localhost:3002/api/articles/create
```

**Method:** POST

**Headers:**
```json
{
  "Content-Type": "application/json",
  "x-api-key": "YOUR_N8N_API_KEY_HERE"
}
```

**Body (JSON):**
```json
{
  "title": "{{ $json.title }}",
  "content": "{{ $json.content }}",
  "category": "{{ $json.category }}"
}
```

### Test n8n Integration

1. Trigger your n8n workflow
2. Check the n8n execution log - you should see a success response
3. Go to your admin dashboard `/admin/articles`
4. You should see a new draft article created by "AI Writer"
5. Review the article and click **Publish** when ready

---

## Admin Routes

All admin routes are protected by authentication:

- `/admin/login` - Admin login page
- `/admin` - Dashboard with statistics
- `/admin/articles` - List all articles (drafts + published)
- `/admin/articles/new` - Create new article
- `/admin/articles/[id]` - Edit existing article

---

## Security Features

✅ **Cookie-Based Authentication** - Secure, httpOnly cookies
✅ **JWT Validation** - Uses `getUser()` for server-side validation
✅ **Role-Based Access** - Middleware checks admin role on every request
✅ **Row Level Security** - Supabase RLS policies enforce database permissions
✅ **API Key Protection** - n8n endpoint requires x-api-key header
✅ **Service Role Key** - n8n uses service role to bypass RLS safely

---

## Troubleshooting

### "Unauthorized: Admin access required"
- Make sure you ran the SQL to promote your user to admin
- Check that `user_profiles` table has the correct role set
- Log out and log back in

### "Invalid API key" from n8n
- Check that `.env.local` has the correct `N8N_API_KEY`
- Make sure n8n is sending the `x-api-key` header
- Restart the dev server after changing `.env.local`

### Middleware redirect loop
- Make sure the middleware file is at the root: `/middleware.ts`
- Check that `/admin/login` is not being protected by role check

### Articles not showing on homepage
- Make sure the article status is "published", not "draft"
- Check that `published_at` timestamp is set
- Verify RLS policies allow public reads for published articles

### Can't see draft articles
- Make sure you're logged in as an admin
- Check that RLS policies allow admins to read all articles
- Verify `user_profiles` table has your user with `role = 'admin'`

---

## File Structure

```
newsletter-project/
├── src/
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts           # Browser client
│   │   │   ├── server.ts           # Server client
│   │   │   └── middleware.ts       # Middleware helper
│   │   └── supabase.ts             # Legacy client
│   ├── components/
│   │   ├── admin/
│   │   │   ├── admin-nav.tsx       # Admin navigation
│   │   │   ├── articles-table.tsx   # Articles list table
│   │   │   ├── article-editor.tsx   # Article form
│   │   │   └── login-form.tsx      # Login form
│   │   └── ui/                     # shadcn components
│   └── app/
│       ├── admin/
│       │   ├── login/
│       │   │   └── page.tsx        # Login page
│       │   ├── articles/
│       │   │   ├── page.tsx        # Articles list
│       │   │   ├── articles-client.tsx # Client wrapper
│       │   │   ├── new/
│       │   │   │   └── page.tsx    # New article
│       │   │   └── [id]/
│       │   │       └── page.tsx    # Edit article
│       │   └── page.tsx            # Dashboard
│       ├── unauthorized/
│       │   └── page.tsx            # 403 page
│       └── api/
│           ├── auth/
│           │   ├── login/
│           │   │   └── route.ts    # Login API
│           │   └── signout/
│           │       └── route.ts    # Logout API
│           ├── admin/
│           │   └── articles/
│           │       ├── route.ts    # Create article
│           │       └── [id]/
│           │           └── route.ts # Update/Delete
│           └── articles/
│               ├── route.ts        # Public API
│               └── create/
│                   └── route.ts    # n8n webhook
├── middleware.ts                   # Root middleware
├── database-setup.sql              # Database schema
└── .env.local                      # Environment variables
```

---

## Next Steps

1. ✅ Complete all setup steps above
2. ✅ Test the admin dashboard functionality
3. ✅ Configure your n8n workflow
4. ✅ Start publishing articles!

### Optional Enhancements

Consider adding these features later:
- Rich text editor (TipTap or similar)
- Image upload functionality
- Article scheduling (publish at specific time)
- Analytics dashboard
- User management interface
- Article categories management
- SEO metadata fields
- Article tags/labels

---

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the Supabase logs in your dashboard
3. Check browser console for errors
4. Review terminal output for API errors

---

**Congratulations! Your admin dashboard is ready to use! 🎉**
