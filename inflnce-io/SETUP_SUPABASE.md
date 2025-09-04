# Setting Up Supabase for Inflnce.io

## Step 1: Get Your Supabase Credentials

1. Go to your Supabase dashboard: https://app.supabase.com
2. Select your project (or create a new one for Inflnce.io)
3. Go to **Settings** → **API**
4. Copy the following values:
   - **Project URL**: (looks like `https://xxxxx.supabase.co`)
   - **Anon/Public Key**: (starts with `eyJ...`)
   - **Service Role Key**: (also starts with `eyJ...`) - Keep this secret!

## Step 2: Update Environment Variables

Create a `.env.local` file in your project root with these values:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Optional: Add your Stripe keys when ready
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 3: Link Your Project

Run this command and follow the prompts:
```bash
supabase link --project-ref your-project-ref
```

Your project reference can be found in:
- Supabase Dashboard → Settings → General → Reference ID
- Or in your project URL: `https://[PROJECT_REF].supabase.co`

## Step 4: Push Database Schema

Once linked, push the database schema to your Supabase instance:

```bash
# Push the migration
supabase db push

# Or if you want to use migrations:
supabase migration up
```

## Step 5: Set Up Authentication

1. In Supabase Dashboard, go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Configure email templates if needed
4. Set redirect URLs:
   - Site URL: `http://localhost:3000`
   - Add redirect URL: `http://localhost:3000/auth/callback`

## Step 6: Create Initial Admin User

After setting up authentication, you can create an admin user:

1. Go to **Authentication** → **Users**
2. Click **Invite User**
3. Enter admin email
4. After user signs up, update their role in the `users` table to 'admin'

## Step 7: Test Your Connection

Run the development server and test the connection:
```bash
npm run dev
```

## Troubleshooting

### If migrations fail:
- Check that your Supabase project is on the free tier or higher
- Ensure RLS is supported (it should be on all plans)
- Try running migrations one at a time

### If authentication doesn't work:
- Double-check your environment variables
- Ensure redirect URLs are correctly configured
- Check browser console for errors

## Next Steps

After setup is complete:
1. Create test tenants in the `tenants` table
2. Add test services for each tenant
3. Test the multi-tenant routing
4. Configure Stripe for payment processing