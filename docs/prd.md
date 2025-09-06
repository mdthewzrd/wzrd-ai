# Project Brief — Inflnce (B2B Digital Service Wholesale Platform)

## Executive Summary
Create a centralized, invite-only B2B wholesale platform for digital marketing/social media services. It solves two problems: (1) provides vetted resellers a one-stop shop of high-quality services with consistent performance and a seamless UX; (2) consolidates the owner's offerings into one scalable system. Target users: digital agencies, wholesalers, and salespeople who resell services to end consumers. Differentiators: reliability, premium UX, USA-based payment infra, breadth of services.

## Problem Statement
**Resellers:** Fragmented market; deal with inconsistent quality, poor UX, and juggling multiple vendors.
**Owner (Luke):** Decentralized ops create manual overhead and bottlenecks; hard to scale.
**Impact:** Inefficiency and stagnation for both sides. Market gap for a professional, trustworthy wholesale hub.

## Proposed Solution
An invite/acceptance-only B2B platform with a professional, mobile-first interface, consistent service quality, and strong brand authority. Consolidates all services under one roof and streamlines operations. USA-based with access to payment rails competitors often lack.

## Target Users
- **Primary:** Wholesale resellers running digital service agencies (tech-savvy, mobile-heavy workflows).
- **Secondary:** Digital marketing operators & salespeople managing client campaigns.

## Goals & Success Metrics
- **Business Objectives:**
  - Consolidate ops within **30 days** of launch.
  - Establish worldwide brand authority; **≥95%** customer satisfaction.
  - Onboard **50 vetted resellers within 60 days**.
- **User Metrics:** multi-service order in <5 minutes; **99.9%** performance consistency; resellers use ≥3 categories within 6 months.
- **KPIs:** MAU, Retention, NPS (target 50+).

## MVP Scope
**Reseller-Facing:** Clerk auth (invite/apply), service catalog, order placement & tracking, payments (Clerk Billing).
**Admin-Facing:** User management, service management (categories/platforms/tiers), order fulfillment dashboard.

### Initial Service Offerings (Launch Set)
- **Categories:** Social Media, Publications, Tools.
- **Platforms (Social Media):** Instagram, YouTube, TikTok, Twitter/X, Spotify, LinkedIn.
- **Service Types:** Multi-tiered campaigns (Monthly & Post), individual engagement units (likes/views/follows/comments/saves), account services (e.g., IG unbanning, username claim), publication placements, and tools (Website design, SEO, Google Knowledge Panel, email automation, short-form content bot, app building).
- **Packaging:** Bronze, Silver, Gold, Emerald, Platinum, Diamond tiers.

> Full structured examples live in `service-catalog-example.md` and should be entered via the Admin Service Manager post-MVP.

### Out of Scope (MVP)
Direct-to-consumer purchasing, advanced analytics, subscription billing, reseller API, affiliate/referral.

## Post-MVP Vision
- **Phase 2:** White-label reseller portals; richer dashboards/analytics; selected in-house services for higher control; continuous catalog expansion.
- **1-2 Year Vision:** Largest global hub for digital marketing services; thousands of users; millions in monthly orders; robust business in automations/apps/websites; productize platform (PaaS) ~$10k.

## Technical Considerations
Next.js + TypeScript; Tailwind + shadcn/ui; Convex (DB + logic); Clerk (auth/billing); Vercel (hosting/CI/CD). Development in Claude Code with git worktrees.

## Constraints & Assumptions
Aggressive onboarding timeline; single-operator bandwidth; committed stack; ready market exists; stack integrates & scales; superior UX drives adoption.

## Risks & Open Questions (Resolved)
Adoption risk mitigated by Luke's existing clients (first 50 via invite). Services start within 24h; no additional SLAs needed initially. Clerk fees acceptable due to high margins.