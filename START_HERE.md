# 🚀 Inflnce.io Complete Setup Guide

## Quick Launch

### Method 1: Using the launch script (Recommended)
```bash
cd "/Users/michaeldurante/wzrd ai/.conductor/mdthewzrd-jakarta/inflnce-io"
./launch.sh
```

### Method 2: Manual steps
```bash
# Navigate to the project directory
cd "/Users/michaeldurante/wzrd ai/.conductor/mdthewzrd-jakarta/inflnce-io"

# Install dependencies (only needed first time)
npm install

# Start the development server
npm run dev
```

## Master Admin Setup

### 1. Configure Supabase
1. Create a new project at https://supabase.com
2. Go to Settings → API and copy your credentials
3. Update `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key
```

### 2. Run Database Migrations
```bash
# Install Supabase CLI
npm install -g @supabase/cli

# Link your project  
supabase link --project-ref your-project-id

# Push migrations to create tables
supabase db push
```

### 3. Create Your Master Admin Account
In your Supabase SQL Editor, run:
```sql
-- Create admin user
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'your-admin-email@example.com',
  crypt('your-secure-password', gen_salt('bf')),
  now(),
  now(),
  now()
);

-- Create admin profile
INSERT INTO users (id, email, role, full_name, is_active)
SELECT id, email, 'admin', 'Your Full Name', true
FROM auth.users WHERE email = 'your-admin-email@example.com';
```

### 4. Sign In
1. Start the server: `./launch.sh`
2. Go to: http://localhost:3000/login
3. Sign in with your admin credentials
4. Access admin dashboard: http://localhost:3000/admin

## Access the Application

Once the server is running, open your browser and visit:
- **Local**: http://localhost:3000
- **Network**: http://192.168.1.218:3000

## Project Structure

Your Inflnce.io project is located at:
```
/Users/michaeldurante/wzrd ai/.conductor/mdthewzrd-jakarta/inflnce-io/
```

## ✅ Fully Functional Pages

### Primary Pages:
- **Homepage**: http://localhost:3000 (Complete with working buttons)
- **Social Media Services**: http://localhost:3000/social-media  
- **Publications**: http://localhost:3000/publications
- **Tools**: http://localhost:3000/tools
- **My Orders**: http://localhost:3000/orders (Track order status)
- **Settings**: http://localhost:3000/settings (Account management)
- **Learn More**: http://localhost:3000/learn (Educational content)

### Service Sub-pages:
- **Instagram**: http://localhost:3000/social-media/instagram
- **YouTube**: http://localhost:3000/social-media/youtube
- **TikTok**: http://localhost:3000/social-media/tiktok
- **Twitter/X**: http://localhost:3000/social-media/twitter
- **LinkedIn**: http://localhost:3000/social-media/linkedin
- **Spotify**: http://localhost:3000/social-media/spotify
- **SEO Tools**: http://localhost:3000/tools/seo
- **Web Development**: http://localhost:3000/tools/web-development

### Authentication (Ready for Setup):
- **Login**: http://localhost:3000/login
- **Admin Dashboard**: http://localhost:3000/admin
- **Reseller Dashboard**: http://localhost:3000/reseller  
- **Client Dashboard**: http://localhost:3000/client

## Troubleshooting

### If you get "command not found: npm"
Make sure Node.js is installed:
```bash
node --version
npm --version
```

### If you get "ENOENT: no such file or directory"
You're in the wrong directory. Make sure to navigate to:
```bash
cd "/Users/michaeldurante/wzrd ai/.conductor/mdthewzrd-jakarta/inflnce-io"
```

### If the server won't start
1. Kill any existing processes:
```bash
pkill -f "next dev"
```

2. Clear Next.js cache:
```bash
cd "/Users/michaeldurante/wzrd ai/.conductor/mdthewzrd-jakarta/inflnce-io"
rm -rf .next
npm run dev
```

## Next Steps

1. **Set up Supabase**:
   - Follow the instructions in `SETUP_SUPABASE.md`
   - Add your credentials to `.env.local`

2. **Configure Stripe**:
   - Get your Stripe API keys
   - Add them to `.env.local`

3. **Customize for your brand**:
   - Update colors and branding
   - Add your services and pricing
   - Configure tenant settings

## Support

The application is now running with:
- ✅ Beautiful UI from the reference design
- ✅ All service pages (Social Media, Publications, Tools)
- ✅ Multi-tenant architecture ready
- ✅ Database schema prepared
- ✅ Authentication pages ready

Your server should be running at **http://localhost:3000** 🎉