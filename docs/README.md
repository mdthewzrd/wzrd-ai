# Inflnce Wholesale Platform — Planning & Architecture Pack (v1)

## What this pack contains
- `prd.md` — Project Brief (goals, scope, success metrics, initial service offerings)
- `ui-ux-spec.md` — UI/UX Specification (style guide, IA, components, key screens)
- `architecture.md` — Fullstack Architecture (stack, models, API, schema, workflows, standards)
- `figma-prompts.md` — Two prompts for Figma Make (high-quality dark mode + clone prompt)
- `service-catalog-example.md` — Structured examples for services & packages to seed the DB

## How to use (Claude Code + git worktrees)
1. Create a new repo (e.g., `inflnce-clone`), add a `docs/` folder.
2. Paste each file below into its matching path.
3. Use git worktrees to split tasks by story (Scrum Master will create Stubb-sized stories):
   ```bash
   git worktree add ../wt-01-service-catalog feature/service-catalog
   git worktree add ../wt-02-auth feature/auth
   ```
4. During dev, keep docs authoritative. Update `service-catalog-example.md` as offerings evolve.

## Source of truth
- B2B, invite/acceptance-only wholesale platform for digital & social media marketing services.
- Mobile-first, dark-mode, shadcn + Tailwind aesthetic.
- Next.js (front+back), Convex (DB), Clerk (auth + billing), Vercel (hosting), TypeScript.
- Built in Claude Code, using git worktrees.