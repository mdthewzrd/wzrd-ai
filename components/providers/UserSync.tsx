"use client";

import { useUser } from "@clerk/nextjs";
import { useConvexAuth, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";

export function UserSync() {
  const { user, isLoaded } = useUser();
  const { isAuthenticated } = useConvexAuth();
  const createOrUpdateUser = useMutation(api.users.getOrCreateUser);
  const updateRole = useMutation(api.seed.updateUserRole);

  useEffect(() => {
    if (isLoaded && isAuthenticated && user) {
      // Sync user with Convex
      createOrUpdateUser({
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress || "",
        name: user.fullName || user.firstName || "User",
      }).then(() => {
        // Check if this should be an admin
        if (user.primaryEmailAddress?.emailAddress === "mikedurante13@gmail.com") {
          updateRole({
            clerkId: user.id,
            email: user.primaryEmailAddress.emailAddress,
          });
        }
      });
    }
  }, [isLoaded, isAuthenticated, user, createOrUpdateUser, updateRole]);

  return null;
}