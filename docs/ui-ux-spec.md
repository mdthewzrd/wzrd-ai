# UI/UX Specification — Inflnce

## UX Principles
Professional & authoritative; seamless and fast; mobile-first; clarity & efficiency over marketing fluff; accessibility considered throughout.

## Branding & Style Guide
- **Theme:** Native dark mode; premium feel.
- **Palette (approx.):**
  - Background `#111827`, Surface `#1F2937`, Border `#374151`
  - Text Primary `#F9FAFB`, Text Secondary `#9CA3AF`
  - Accent (CTAs/highlights): vibrant green `#22C55E` (or brand accent), gradients by platform when desired.
- **Typography:** Inter (or Satoshi). Clear hierarchy: H1 48-60, H2 30-36, H3 20-24, Body 16, Small 12-14.
- **Icons:** Lucide.
- **Spacing:** 8px scale, 12-column grid; soft-sharp radii (6-8px).

## Information Architecture (Site Map)
- **Public:** Homepage → Social Media Hub / Publications Hub / Tools Hub → Login/Apply.
- **Secure Reseller:** Dashboard → Place Order / Orders / Account.
- **Secure Admin:** Admin Login → Admin Dashboard → Users / Services / Orders.

## Component Inventory (Reusable)
Header, Footer, Admin Sidebar, Platform Sub-Nav (pills), Price Filter (slider), Service Package Card/List, Feature Card, Value Prop Card, Stat Card, Data Table (sort/filter/search), Modals, Status Badges, Primary/Secondary Buttons, Forms/Inputs.

## Key Screens (Mobile-first → Desktop)
1. **Login / Apply** — Clerk UI or custom shell.
2. **Reseller Dashboard** — welcome, active orders, quick links to popular services.
3. **Service Catalog** — filterable grid by Category → Platform → Type.
4. **Service Details & Ordering** — tiered pricing table; "Order Now" → minimal form (e.g., URL).
5. **Orders** — sortable table: ID, Service, Tier, Date, Price, Status.
6. **Admin** —
   - Dashboard: stat cards (users, pending/complete orders, MRR).
   - User Management: invite/approve/suspend.
   - Service Management: categories/platforms/tiers CRUD.
   - Order Management: status transitions (Pending/In Progress/Complete/Canceled).

## Design References
- Visual inspiration: `inflnce-io.vercel.app` (clone the look & feel at higher quality).
- Dashboard component ideas: `inflncedev` repo patterns.