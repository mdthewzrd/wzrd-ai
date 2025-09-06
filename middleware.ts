import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/admin(.*)',
  '/services/social-media/(instagram|youtube|tiktok|twitter|spotify|linkedin)(.*)',
  '/services/publications/(.*)',
  '/services/tools/(.*)',
  '/orders(.*)',
]);

const isPublicRoute = createRouteMatcher([
  '/',
  '/services',
  '/services/social-media',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhook(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Only protect routes that need authentication
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
  // Allow public routes to pass through
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};