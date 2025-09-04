# BMAD PRD — Multi‑Tenant Reseller Dashboard (Worktree‑Ready v1.0)

**Status:** Draft for review  
**Owner:** BMAD Team (PM/PO/SM/Dev/UX/QA)  
**Date:** 2025‑09‑03  
**Goal:** A modular, white‑labeled, multi‑tenant dashboard where Admins manage tenants/services, Resellers brand + price, and Clients purchase via **Stripe Checkout links** (no cart). **Designed for Git worktrees** and multi‑agent parallelism from day one.

---

## 1) Problem, Vision, Non‑Goals

**Problem:** Agencies want to resell productized services without building/maintaining full e‑commerce. They need a fast, brandable dashboard that routes buyers to Stripe Checkout.

**Vision:** A premium, responsive, role‑aware dashboard that instantly white‑labels per tenant (reseller). Admin controls infra, branding defaults, catalogs, and optional fulfillment hooks.

**Non‑Goals:**
- No in‑house cart/PCI flows. Purchases happen **off‑platform** in Stripe Checkout.
- No inventory, taxes, or shipping engine in v1.
- No complex marketplace payout logic (can add later via Stripe Connect if needed).

**Success Metrics (MVP):**
- T<30s cold start to a tenant‑themed UI.  
- <1 day to onboard a new reseller (tenant record + DNS).  
- 95%+ purchases click‑through to Stripe Checkout without support tickets.  
- <1% theming defects across top 3 screen sizes.

---

## 2) Users & Roles

- **Admin (superuser):** Manage tenants, users, services, theme defaults; view logs; configure Stripe link schemas.
- **Reseller (tenant admin):** Customize logo/colors, set per‑service pricing/links, invite client users.
- **Client (tenant member):** Authenticated, sees service catalog; buys via Stripe links; can view order history (optional webhook log).

Role source of truth: **Supabase Auth** (Postgres) + RLS. Roles: `admin`, `reseller`, `client`. Optional social login in v2.

---

## 3) Tech Stack & Hosting

- **Frontend:** Next.js (App Router), React Server Components, TypeScript
- **Styling:** Tailwind CSS; design tokens per tenant; shadcn/ui for primitives
- **Auth & DB:** Supabase (Postgres + Auth + RLS)
- **Payments:** Stripe Checkout (external URLs per service/tenant)
- **Hosting:** Vercel (frontend) + Supabase (managed Postgres). Optional Railway alt.
- **CI/CD:** GitHub Actions → Vercel Preview/Prod; Supabase migrations via `supabase/migrations`.
- **Testing:** Vitest + React Testing Library; Playwright for happy‑path E2E.

---

## 4) Architecture Overview (High Level)

**Client** → **Next.js** (middleware detects tenant from host/path) → **Server Components** read **Supabase** (RLS‑protected) → render **tenant‑themed UI** → **Buy** button opens **Stripe Checkout URL** (new tab).  
Optional: webhooks (Stripe → API route) to log orders to Postgres.

**Multi‑Tenant Theming:** run‑time theme object from `tenants` + `theme_overrides` tables (logo, color, font).  
**Routing:** subdomain `https://{tenant}.yourplatform.com` or path `https://yourplatform.com/t/{tenant}`.

---

## 5) Multi‑Tenant Model & Routing

**Tenant resolution order:**
1. Subdomain (preferred) → `tenant.slug`
2. Path prefix `/t/{slug}` (fallback/dev)
3. Default (marketing/home)

**Next.js middleware behavior:**
- Parse `request.headers.host`; map to `tenant.slug`.
- Attach `x-tenant-id` to request; SSR loads theme + services filtered by tenant.

**Vercel:** wildcard domain `*.yourplatform.com` → project; optional custom CNAME per reseller.

---

## 6) Data Model (MVP)

### Tables

**users**
- `id (uuid, pk)` — Supabase Auth UID  
- `email (text, unique)`  
- `role (text)` — `admin|reseller|client`  
- `tenant_id (uuid, fk tenants.id, nullable for admin)`

**tenants**
- `id (uuid, pk)`  
- `slug (text, unique)`  
- `name (text)`  
- `logo_url (text)`  
- `brand_color (text)`  
- `font_family (text)`  
- `stripe_public_key (text, nullable)`  
- `domain (text, nullable)`

**services**
- `id (uuid, pk)`  
- `tenant_id (uuid, fk)`  
- `name (text)`  
- `image_url (text)`  
- `description (text)`  
- `price_display (text)`  
- `stripe_checkout_url (text)`  
- `is_active (bool)`

**orders (optional v2)**
- `id (uuid, pk)`  
- `tenant_id (uuid)`  
- `service_id (uuid)`  
- `email (text)`  
- `stripe_session_id (text)`  
- `amount (int)`  
- `currency (text)`  
- `status (text)`  
- `created_at (timestamptz)`

**support_tickets (optional)** — lightweight contact form per tenant.

### RLS Policies (concept)
- **tenants:** `admin` can all; `reseller` can select/update where `tenant_id = tenants.id`; `client` select read‑only for their `tenant_id`.
- **services:** `admin` all; `reseller` CRUD where `services.tenant_id = auth.user().tenant_id`; `client` select where `tenant_id = auth.user().tenant_id` and `is_active = true`.
- **users:** `admin` all; `reseller` select users in same tenant; `client` select self only.

---

## 7) Authentication & Authorization

- **Supabase Auth** email/password (magic link optional later).  
- Role stored in `public.users.role` and `tenant_id` linked.  
- Edge middleware redirects unauthenticated `/dashboard` → `/login`.

**Session Flow:** Login → SSR fetch user + tenant → hydrate theme → route to role dashboard.

---

## 8) Stripe Integration (MVP)

- Each **service** row contains the **Stripe Checkout URL**. Clicking **Buy Now** opens URL in new tab (Stripe hosts payment).  
- **Validation:** URLs must start with `https://checkout.stripe.com/` or approved domain.  
- **Optional v2:** Stripe Webhook → `/api/stripe/webhook` logs paid sessions to `orders` and sends email/slack to Admin/Reseller.

---

## 9) Dashboards & UX Scope

### Admin Dashboard
- **Tenants:** CRUD; assign domains; theme defaults.  
- **Users:** Invite/assign roles; search; suspend.  
- **Services (global):** Template services; clone to tenants; validate Stripe URLs.  
- **Settings:** Toggle features (webhooks, contact tickets).  
- **Logs:** Recent sign‑ins, webhook events (if enabled).

### Reseller Dashboard
- **Branding:** Logo upload, colors, font.  
- **Catalog:** Add/edit services; set `price_display` & `stripe_checkout_url` per entry.  
- **Clients:** Invite users (role `client`).  
- **Links:** Preview storefront; copy shareable links.

### Client Dashboard
- **Catalog:** Grid/List of services with image, description, price, **Buy Now** button (opens Stripe).  
- **History (v2):** Show orders from webhook log.

**UI Aesthetic:** “Notion/Framer/Superhuman” — minimal, fast, generous spacing; mobile responsive; accessible.

---

## 10) Non‑Functional

- **Performance:** LCP < 2.5s on 4G; TTFB < 500ms on cached tenant theme.  
- **Reliability:** 99.9% frontend availability; DB backups daily.  
- **Security:** RLS for every table; no secrets to client; CSP for Stripe only.  
- **Accessibility:** WCAG 2.1 AA; focus states; keyboard nav.  
- **Observability:** Vercel Analytics; Sentry for FE errors; simple `logs` table for admin events.

---

## 11) DevEx & Repo Layout (Worktree‑First)

```
repo/
├─ app/                     # Next.js app router
│  ├─ (public)/login
│  ├─ (dash)/admin
│  ├─ (dash)/reseller
│  ├─ (dash)/client
│  ├─ api/stripe/webhook (v2)
│  └─ middleware.ts         # tenant resolution
├─ lib/
│  ├─ supabase.ts
│  ├─ auth.ts
│  ├─ tenant.ts             # getTenantFromHost, theme loader
│  └─ rls.ts                # helpers for claims
├─ components/
│  ├─ ServiceCard.tsx
│  ├─ ThemeProvider.tsx
│  └─ Nav/Sidebar/*
├─ styles/                  # tailwind + css vars per tenant
├─ supabase/
│  └─ migrations/           # SQL schema, RLS policies
├─ docs/
│  ├─ prd.md                # this PRD (source of truth)
│  ├─ architecture.md
│  ├─ prd/                  # sharded PRD after *shard-doc
│  ├─ architecture/         # sharded architecture
│  ├─ epics/                # EP‑* folders w/ stories
│  └─ stories/              # story files ST‑* (one per feature)
├─ .github/
│  ├─ workflows/ci.yml      # typecheck, test, build
│  └─ PULL_REQUEST_TEMPLATE.md
└─ package.json
```

**Commit style:** Conventional Commits.  
**Branching:** Trunk‑based with short‑lived feature branches per **story**.  
**Worktrees:** One worktree per **epic** or **large story** (see §13).

---

## 12) CI/CD

- **CI:**
  - `pnpm i && pnpm typecheck && pnpm test && pnpm build`  
  - Lint: `eslint` + `prettier --check`  
  - Playwright smoke on `/` + one protected tenant page.
- **CD:** Vercel Preview per PR; auto‑promote on approval. Supabase migrations gated behind manual `deploy:migrations`.

---

## 13) Git Worktrees Collaboration Playbook

**Why:** Allow multiple agents to work in parallel without stomping each other, while keeping a single origin repo.

**Conventions:**
- **Epic IDs:** `EP-01`, `EP-02`, ...  
- **Story IDs:** `ST-01.01`, `ST-01.02` (story belongs to an Epic).  
- **Branch names:** `feat/EP-01-ST-01.01-tenant-middleware`  
- **Story files:** `docs/stories/ST-01.01.md` (authoritative spec + AC + DoD).

**Create a worktree for Epic 1:**
```bash
git fetch origin
# Each epic lives as a worktree sibling folder for isolation
git worktree add ../wt-EP-01 -b feat/EP-01
cd ../wt-EP-01
# Create story branch under the epic worktree
git switch -c feat/EP-01-ST-01.01-tenant-middleware
```
Commit to your worktree; open PRs from story branches. Delete worktree when merged:
```bash
cd repo && git worktree remove ../wt-EP-01
```

**Ownership:**
- **SM** creates/curates story files.  
- **Dev** implements; updates **File List** in story file.  
- **QA** appends review results to the same story file; status → `Done` when approved.

**Parallelism Guardrails:**
- No cross‑epic refactors in story branches; file touches must be scoped to the story.  
- Shared contracts live in `lib/` and require a small, separate infra story if changed.

---

## 14) Story Shards & File Template

**Location:** `docs/stories/ST-<epic>.<n>.md`  
**Template (to copy for each story):**

```markdown
# ST-<id>: <concise title>

**Epic:** EP-<id>  
**Type:** Feature | Tech Debt | Spike  
**Owner:** <agent>  
**Status:** Draft → Approved → InProgress → Review → Done

## Summary
One paragraph describing the outcome.

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

## Out of Scope
- Items explicitly excluded

## Implementation Notes
- Pointers to components, routes, tables.

## Test Plan
- Unit:
- E2E:

## File List (Dev Maintained)
- path/to/file1 (new)
- path/to/file2 (modified)

## QA Results (QA Maintained)
- Reviewer:  
- Findings:  
- Status:
```

---

## 15) MVP Scope Checklist (Must‑Have)

- [ ] Auth: email/pw signup/login; session persistence
- [ ] Role routing (admin/reseller/client)
- [ ] Tenant resolution (subdomain + path fallback)
- [ ] Dynamic theming (logo/color/font)
- [ ] Service catalog per tenant (grid/list)
- [ ] Stripe Checkout links (open in new tab)
- [ ] Admin: CRUD tenants/users/services
- [ ] Reseller: branding + service CRUD
- [ ] Client: browse + buy
- [ ] RLS policies protecting cross‑tenant access
- [ ] Responsive UI and basic accessibility

---

## 16) Phase 2+ (Nice‑to‑Have)

- Stripe webhooks → `orders` log and receipts  
- Client invites; reseller team roles  
- Analytics: views → clicks → Checkout conversion  
- Commission/markup tracking  
- Support tickets  
- Zapier/N8N hooks  
- Custom fonts and advanced themes  
- i18n

---

## 17) Risks & Mitigations

- **Tenant spoofing via host headers** → Validate against allowlist of domains; sanitize; SSR checks.  
- **Broken Stripe links** → Admin validator; preview checker; CI link lints.  
- **RLS misconfig** → Add automated policy tests; QA E2E cross‑tenant access attempts.  
- **Theme contrast issues** → Token contrast rules; automated a11y lint.

---

## 18) Key Interface Contracts (for Parallel Work)

- **`tenant.ts`**: `getTenant(ctx) → { id, slug, theme }`  
- **`ThemeProvider`**: consumes `theme` and exposes CSS vars `--brand`, `--bg`, `--text`.  
- **`ServiceCard` props**: `{ name, imageUrl, description, priceDisplay, checkoutUrl }`  
- **`AuthGuard`**: gate route by `role` array.

Changing these requires a small tech‑debt story and heads‑up to all worktrees.

---

## 19) Example SQL (Schema + RLS Skeleton)

```sql
-- Tenants
create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  logo_url text,
  brand_color text,
  font_family text,
  stripe_public_key text,
  domain text
);

-- Users (profile mirror of auth)
create table if not exists public.users (
  id uuid primary key,
  email text unique not null,
  role text check (role in ('admin','reseller','client')) not null,
  tenant_id uuid references public.tenants(id)
);

-- Services
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) not null,
  name text not null,
  image_url text,
  description text,
  price_display text,
  stripe_checkout_url text not null,
  is_active boolean default true
);

alter table public.tenants enable row level security;
alter table public.users enable row level security;
alter table public.services enable row level security;

-- Helper: current role/tenant via JWT or users table
-- Example policies (simplified):
create policy tenants_admin_all on public.tenants
  for all using (exists (
    select 1 from public.users u where u.id = auth.uid() and u.role = 'admin'
  ));

create policy services_select_same_tenant on public.services
  for select using (
    exists (
      select 1 from public.users u
      where u.id = auth.uid() and u.tenant_id = services.tenant_id
    ) or (
      -- Allow anonymous browse only if you later add public catalogs
      false
    )
  );

create policy services_crud_reseller on public.services
  for all using (
    exists (
      select 1 from public.users u
      where u.id = auth.uid() and u.role in ('admin','reseller') and u.tenant_id = services.tenant_id
    )
  );
```

---

## 20) Example Next.js Touchpoints (Contracts Only)

```ts
// lib/tenant.ts
export function parseTenantFromHost(host?: string) {/* ... */}
export async function getTenant(slugOrHost: string) {
  // fetch tenant by slug or domain; return {id, slug, theme}
}
```

```ts
// middleware.ts (sketch)
import { NextResponse } from 'next/server'
export function middleware(req: Request) {
  const host = new URL(req.url).host
  const tenant = /* parse host */
  const res = NextResponse.next()
  res.headers.set('x-tenant', tenant)
  return res
}
```

```tsx
// components/ServiceCard.tsx (props contract)
type Props = {
  name: string; imageUrl?: string; description?: string;
  priceDisplay?: string; checkoutUrl: string
}
```

---

## 21) Epics & Stories (Worktree‑Friendly Backlog)

### EP‑01: Tenant Resolution & Theming (Foundations)
**Outcome:** Correct tenant detected and theme applied across app.

- **ST‑01.01** Tenant detection middleware
  - **AC:** Subdomain & `/t/slug` supported; default route safe; header `x-tenant` set.
- **ST‑01.02** Theme loader + CSS vars
  - **AC:** Logo, primary color, font applied to nav, buttons, headings.
- **ST‑01.03** Public marketing/home page with tenant switcher (dev‑only)
  - **AC:** Simple dropdown of tenants for local testing.

### EP‑02: Auth & Role Routing
- **ST‑02.01** Email/password signup & login (Supabase)
  - **AC:** Errors surfaced; session persisted; logout clears state.
- **ST‑02.02** Role‑aware redirects
  - **AC:** `admin`→/admin, `reseller`→/reseller, `client`→/client on login.
- **ST‑02.03** RLS smoke tests
  - **AC:** Cross‑tenant queries fail; same‑tenant pass.

### EP‑03: Catalog & Stripe Links
- **ST‑03.01** Service list/grid per tenant
  - **AC:** Pagination or lazy render; a11y labels; empty state.
- **ST‑03.02** Service detail (optional) + **Buy Now**
  - **AC:** Button opens Stripe Checkout in new tab; URL validated.
- **ST‑03.03** Link validator utility & CI rule
  - **AC:** PR fails on non‑Stripe URL or 404 (HEAD check allowed in CI).

### EP‑04: Admin Dashboard
- **ST‑04.01** Tenants CRUD (slug, domain, theme)
- **ST‑04.02** Users CRUD + role assignments
- **ST‑04.03** Service templates + clone to tenant

### EP‑05: Reseller Dashboard
- **ST‑05.01** Branding editor (logo upload, colors, font)
- **ST‑05.02** Service CRUD + price display + link entry
- **ST‑05.03** Invite client users

### EP‑06: Client Dashboard
- **ST‑06.01** Catalog view with buy flow
- **ST‑06.02 (v2)** Order history from webhook log

### EP‑07: Observability & QA
- **ST‑07.01** Sentry + Vercel Analytics wiring
- **ST‑07.02** Playwright smoke: login → view catalog → click buy

> Each story must have a corresponding `docs/stories/ST-xx.yy.md` before implementation, and a matching **feature branch** + optional **worktree**.

---

## 22) Definition of Done (DoD)

- Story file exists and is **Approved**.  
- All AC satisfied; no unchecked boxes.  
- Unit tests added; Playwright updated when relevant.  
- RLS/permissions confirmed (if applicable).  
- A11y pass (keyboard/focus/contrast).  
- PR linked to story ID; preview validated; **File List** updated.  
- QA review appended to story file; status **Done**.

---

## 23) Operating Procedures (BMAD‑Style Handoffs)

1. **SM**: Creates next story from `docs/prd/` shards → `docs/stories/ST-*.md`.  
2. **Dev**: Implements story in a **worktree** (per epic) with **feature branch** (per story).  
3. **QA**: Reviews PR; updates **QA Results** in story file; requests changes or approves.  
4. **PO**: Moves status to `Done`; schedules next story.

**Golden Rule:** One active story per dev; avoid cross‑epic edits in the same PR.

---

## 24) Rollout & Onboarding

- **Dev**: Use path routing locally (`/t/{slug}`) to avoid DNS.  
- **Staging**: Two tenants for demo (Acme, Bluebird).  
- **Prod**: Add reseller CNAMEs → Vercel wildcard.

---

## 25) Appendix — Helpful Commands

```bash
# Create new Epic worktree
git worktree add ../wt-EP-02 -b feat/EP-02

# Start a Story branch inside that worktree
cd ../wt-EP-02 && git switch -c feat/EP-02-ST-02.02-role-routing

# After merge, clean up
git worktree remove ../wt-EP-02

# Supabase migration create
supabase migration new add-services-table

# Playwright headless run
pnpm exec playwright test --project=chromium
```

---

**End of PRD v1.0** — Built to be cloned, sharded, and executed with Git worktrees + multi‑agent parallelism.

