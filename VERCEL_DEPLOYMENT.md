# Vercel Deployment Guide for inflnce.io

## Required Environment Variables

You need to add these environment variables in your Vercel dashboard:

### 1. Go to your Vercel project settings
Visit: https://vercel.com/your-username/inflnce2-0/settings/environment-variables

### 2. Add these environment variables:

#### Clerk Authentication
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: `pk_test_cmljaC13aGFsZS03Ny5jbGVyay5hY2NvdW50cy5kZXYk`
- `CLERK_SECRET_KEY`: `sk_test_kOHnZ0SepBh7PrrDSt2RaThFfDuxpIO1kJDcOpzl4h`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`: `/sign-in`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL`: `/sign-up`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`: `/dashboard`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`: `/dashboard`

#### Convex Database
- `NEXT_PUBLIC_CONVEX_URL`: `https://precise-echidna-398.convex.cloud`
- `CONVEX_DEPLOYMENT`: `dev:precise-echidna-398`

### 3. Deploy Command
After adding environment variables, run:
```bash
vercel --prod
```

## Alternative: Deploy via CLI with Environment Variables

```bash
vercel --prod \
  -e NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_cmljaC13aGFsZS03Ny5jbGVyay5hY2NvdW50cy5kZXYk" \
  -e CLERK_SECRET_KEY="sk_test_kOHnZ0SepBh7PrrDSt2RaThFfDuxpIO1kJDcOpzl4h" \
  -e NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in" \
  -e NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up" \
  -e NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard" \
  -e NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/dashboard" \
  -e NEXT_PUBLIC_CONVEX_URL="https://precise-echidna-398.convex.cloud" \
  -e CONVEX_DEPLOYMENT="dev:precise-echidna-398"
```

## Post-Deployment Steps

1. **Update Clerk Settings**:
   - Go to https://dashboard.clerk.com
   - Add your Vercel domain to allowed origins
   - Update redirect URLs to include your production domain

2. **Update Convex Settings**:
   - Go to https://dashboard.convex.dev
   - Ensure your production URL is whitelisted

3. **Custom Domain** (Optional):
   - In Vercel dashboard, go to Settings > Domains
   - Add your custom domain (inflnce.io)
   - Update DNS records as instructed

## Troubleshooting

- If authentication doesn't work, ensure your production domain is added to Clerk's allowed origins
- Check Vercel Functions logs for any server-side errors
- Ensure all environment variables are properly set in Vercel dashboard