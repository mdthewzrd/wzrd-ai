# Inflnce.io - Multi-Tenant Reseller Dashboard

A premium white-label reseller platform for digital services built with Next.js, Supabase, and Stripe.

## Features

- 🏢 **Multi-Tenant Architecture** - Support multiple resellers with isolated data
- 🎨 **White-Label Branding** - Custom themes, logos, and domains per tenant
- 💳 **Stripe Integration** - Secure checkout via Stripe Checkout links
- 🔐 **Role-Based Access** - Admin, Reseller, and Client dashboards
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- ⚡ **Performance Optimized** - Built with Next.js App Router and RSC

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Database**: Supabase (PostgreSQL with RLS)
- **Authentication**: Supabase Auth
- **Payments**: Stripe Checkout
- **Hosting**: Vercel (recommended)
- **UI Components**: shadcn/ui + Radix UI

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Stripe account

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd inflnce-io
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.local.example .env.local
```

4. Configure your environment variables in `.env.local`:
- Add your Supabase project URL and keys
- Add your Stripe API keys
- Set your app URL

5. Run database migrations:
```bash
npx supabase db push
```

6. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
inflnce-io/
├── app/                    # Next.js App Router
│   ├── (public)/          # Public routes (login, signup)
│   ├── (dash)/            # Dashboard routes
│   │   ├── admin/         # Admin dashboard
│   │   ├── reseller/      # Reseller dashboard
│   │   └── client/        # Client dashboard
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # UI components (buttons, cards, etc.)
│   └── ServiceCard.tsx   # Service catalog card
├── lib/                   # Utility functions
│   ├── supabase.ts       # Supabase client
│   ├── tenant.ts         # Tenant resolution
│   └── utils.ts          # Helper functions
├── supabase/             # Database
│   └── migrations/       # SQL migrations
├── docs/                 # Documentation
│   └── prd.md           # Product Requirements Document
└── middleware.ts         # Next.js middleware for tenant resolution
```

## Database Schema

The application uses the following main tables:

- **tenants** - Stores tenant/reseller information and branding
- **users** - User profiles with roles (admin, reseller, client)
- **services** - Service catalog per tenant
- **orders** - Order history from Stripe webhooks (v2)

All tables have Row Level Security (RLS) enabled for data isolation.

## Development Workflow

### Branching Strategy

- Main branch: `main`
- Feature branches: `feat/EP-XX-ST-XX-description`
- Use conventional commits for clear history

### Testing

```bash
# Run tests
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Docker

```bash
docker build -t inflnce-io .
docker run -p 3000:3000 inflnce-io
```

## Contributing

Please see the PRD in `docs/prd.md` for detailed requirements and development guidelines.

## License

[Your License]

## Support

For issues and questions, please open a GitHub issue.
