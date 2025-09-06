"use client";

import { ReactNode } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  if (!convex) {
    console.warn("Convex URL not configured. Database features will not work.");
    return <>{children}</>;
  }
  
  return (
    <ConvexProvider client={convex}>
      {children}
    </ConvexProvider>
  );
}