# Fullstack Architecture — Inflnce

## High-Level
- **Stack:** Next.js (App Router) + TypeScript; Tailwind + shadcn/ui; Zustand; tRPC; Convex (DB + logic); Clerk (auth/billing); Vercel (hosting/CI/CD).
- **Dev Env:** Claude Code + git worktrees.

### Interaction Overview
- Frontend (Next.js) uses Clerk for auth UI; tRPC client for typed data access.
- Backend (Convex) exposes typed procedures; validates Clerk sessions; persists to Convex DB.

## Tech Stack (selected)
- **Frontend:** Next.js 14, TS 5.x, Tailwind 3.x, shadcn/ui, Zustand.
- **Backend:** Convex 1.x (DB + functions), tRPC.
- **Auth/Billing:** Clerk 5.x.
- **Testing:** Jest + RTL (FE), Vitest (BE), Playwright (E2E).
- **Hosting:** Vercel (Edge/CDN/CI/CD).

## Data Models (TS interfaces)
```ts
interface User { _id: Id<"users">; clerkId: string; status: "pending" | "active" | "suspended"; }
interface Service { _id: Id<"services">; name: string; description: string; category: "socialMedia" | "publication" | "tool"; platform: "instagram" | "youtube" | "tiktok" | "twitter" | "spotify" | "linkedin"; }
interface Package { _id: Id<"packages">; serviceId: Id<"services">; name: string; price: number; deliverables: string[]; }
interface Order { _id: Id<"orders">; userId: Id<"users">; packageId: Id<"packages">; status: "pending" | "inProgress" | "complete" | "canceled"; inputData: Record<string, any>; createdAt: number; }
```

## API (tRPC Routers)
- **services:** `listByCategory({category})`, `getById({serviceId})`
- **orders:** `create({packageId,inputData})` (protected), `listMine()` (protected)
- **admin:** `listUsers()` (admin), `updateUserStatus({userId,status})` (admin), `listAllOrders()` (admin)

## External Integrations
- **Clerk:** SignIn/SignUp components, session validation in Convex for protected procedures.
- **Convex:** Real-time DB; functions for queries/mutations; webhook room via `http.ts` (future).

## Core Workflows (sequence)
- **Registration:** Apply → Clerk SignUp → create `User` (status `pending`) in Convex → message "Application received".
- **Place Order:** Auth user selects Package → submit form → tRPC `orders.create` → Convex creates `Order(pending)`.

## Database Schema (convex/schema.ts)
```ts
import { defineSchema, defineTable } from "convex/server"; import { v } from "convex/values";
export default defineSchema({
  users: defineTable({ clerkId: v.string(), status: v.union(v.literal("pending"), v.literal("active"), v.literal("suspended")) }).index("by_clerk_id", ["clerkId"]),
  services: defineTable({ name: v.string(), description: v.string(), category: v.union(v.literal("socialMedia"), v.literal("publication"), v.literal("tool")), platform: v.string() }).index("by_category", ["category"]),
  packages: defineTable({ serviceId: v.id("services"), name: v.string(), price: v.number(), deliverables: v.array(v.string()) }).index("by_service_id", ["serviceId"]),
  orders: defineTable({ userId: v.id("users"), packageId: v.id("packages"), status: v.union(v.literal("pending"), v.literal("inProgress"), v.literal("complete"), v.literal("canceled")), inputData: v.object({}) }).index("by_user_id", ["userId"]),
});
```

## Frontend Architecture
- **Structure:**
```
src/app/(auth)/ ...  # Clerk pages
src/app/(dashboard)/ {admin,orders}/ ...  # protected
src/app/services/ ...
src/components/ui/ ...  # shadcn
src/components/shared/ ...  # Header/Footer/etc
src/lib/trpc.ts, src/lib/utils.ts
src/stores/use-user-store.ts
```
- **Routing:** App Router; protect dashboard with `<Protect>`.
- **State:** Zustand for global; local via `useState`.
- **Data:** Only via tRPC hooks.

## Backend Architecture (Convex)
- **Files:** `convex/{services.ts, orders.ts, admin.ts, users.ts, http.ts, schema.ts}`
- **Patterns:** queries/mutations; admin procedures gated by role; always validate Clerk session in protected flows.

## Unified Project Structure (top-level)
```
/inflnce-clone
  convex/ ...
  public/
  src/app/...  src/components/...  src/lib/...  src/stores/...
  docs/ (this pack)
  .env.local  next.config.js  tailwind.config.ts  tsconfig.json  package.json
```

## Development Workflow
- **Setup:** `npm i`; `npx convex dev`; `npm run dev`.
- **Env:** `NEXT_PUBLIC_CONVEX_URL`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`.
- **Git worktrees:** one sub-task per worktree for focus.

## Deployment (Vercel)
- Preview per branch; main → production. One-click rollbacks. Manage env vars in Vercel + Convex.

## Security & Performance
- Auth by Clerk; RBAC for admin; zod validation; HTTPS in transit; at-rest encryption managed by platforms.
- Mobile performance focus: static/edge where possible; indexed queries; auto scaling.

## Testing Strategy
- Unit: Jest/RTL (FE), Vitest (BE). E2E: Playwright for critical flows (auth, order create, admin status change).

## Coding Standards (critical)
- Strict TS; no `any` unless justified.
- Frontend hits backend only via tRPC.
- Global state via Zustand; UI via shadcn.
- Env var hygiene (`NEXT_PUBLIC_*` on FE; secrets in Vercel/Convex).

## Error Handling
- tRPC errors with codes (`BAD_REQUEST`, `UNAUTHORIZED`, etc.).
- Frontend shows toast messages; logs via (future) Sentry/console discipline.