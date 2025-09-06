# Inflnce - B2B Digital Service Wholesale Platform

A premium B2B wholesale platform for digital marketing and social media services built with Next.js, TypeScript, Convex, and Clerk.

## Features

✅ **Complete Platform Implementation**
- Landing page with service showcase
- Service catalog with filtering
- User authentication (Clerk)
- Protected dashboard routes
- Responsive dark mode design
- Database schema (Convex)
- Reusable components library

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Lucide Icons
- **Database**: Convex (schema and functions ready)
- **Authentication**: Clerk
- **Deployment**: Vercel-ready

## Project Structure

```
inflncesite/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Landing page
│   ├── services/          # Services catalog
│   ├── dashboard/         # Protected user dashboard
│   ├── sign-in/          # Clerk sign-in
│   └── sign-up/          # Clerk sign-up
├── components/
│   ├── ui/               # shadcn/ui components
│   └── shared/           # Custom reusable components
├── convex/               # Database schema and functions
├── docs/                 # Complete documentation
└── lib/                  # Utilities
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Clerk account
- Convex account

### Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your credentials:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret

# Convex Database
NEXT_PUBLIC_CONVEX_URL=your_convex_url
CONVEX_DEPLOYMENT=your_deployment
```

### Installation

```bash
# Install dependencies
npm install

# Set up Convex (optional - for database)
npx convex dev

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Key Features Implemented

### Public Pages
- **Landing Page**: Hero section, features, service categories, CTAs
- **Services Hub**: Filterable catalog with tabs for categories
- **Authentication**: Sign-in/Sign-up with Clerk

### Protected Routes
- **Dashboard**: User stats, recent orders, quick actions
- **Middleware**: Route protection with Clerk

### Components Library
- **ServiceCard**: Display service packages with pricing
- **PricingTable**: Interactive tier selection
- **StatCard**: Dashboard statistics display
- **Header/Footer**: Responsive navigation

### Database (Convex)
- **Schema**: Users, Services, Packages, Orders
- **Functions**: CRUD operations for all entities
- **Admin Functions**: User management, order tracking

## Development Status

✅ **Completed**
- Project setup and configuration
- Documentation (PRD, Architecture, UI/UX specs)
- Database schema and functions
- Authentication integration
- Component library
- Public pages
- Service catalog
- Dashboard implementation

🔄 **Ready for Production**
- Connect Convex database
- Add environment variables
- Deploy to Vercel

## Build & Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Vercel Deployment

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

## Documentation

Complete documentation available in `/docs`:
- `prd.md` - Product requirements
- `architecture.md` - Technical architecture
- `ui-ux-spec.md` - Design specifications
- `service-catalog-example.md` - Service data structure

## Service Categories

### Social Media
- Instagram (Monthly & Post Campaigns)
- YouTube (Video Promotion)
- TikTok (Growth Packages)
- Spotify (Song Campaigns)
- Twitter/X, LinkedIn

### Publications
- Online Media
- Print Publications
- Broadcast Television
- Digital Media

### Digital Tools
- Website Design
- SEO Services
- Email Automation
- App Development
- Google Knowledge Panel

## Notes

- The platform is invite-only (B2B)
- Dark mode native design
- Mobile-first responsive
- Production-ready codebase
- All services have Bronze-Diamond tiers

## License

Private - All rights reserved

---

Built with Next.js, TypeScript, and modern web technologies.