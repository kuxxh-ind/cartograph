"use client";

import { useOrganizationList } from "@clerk/nextjs";
import { useEffect } from "react";
import { Building2, Plus, Sparkles } from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";

export function OrgAutoSelector({
  userId,
}: {
  userId: string;
}) {
  const { isLoaded, userMemberships, setActive, createOrganization } =
    useOrganizationList({
      userMemberships: {
        infinite: true,
      },
    });

  useEffect(() => {
    if (!isLoaded) return;

    // If user has memberships but no active org selected, select the first one
    if (userMemberships.data && userMemberships.data.length > 0 && setActive) {
      const firstOrgId = userMemberships.data[0].organization.id;
      setActive({ organization: firstOrgId });
    }
  }, [isLoaded, userMemberships.data, setActive]);

  if (!isLoaded) {
    return (
      <div className="p-8 text-center text-muted-foreground animate-pulse">
        Loading organization context...
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto my-12 p-8 border border-border rounded-2xl bg-card shadow-sm text-center">
      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
        <Building2 className="w-6 h-6" />
      </div>
      <h2 className="text-xl font-semibold mb-2">No Active Organization</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Create or join an organization workspace to start collaborating on Cartograph projects.
      </p>

      <div className="flex justify-center">
        <CreateOrganization
          afterCreateOrganizationUrl="/workspace"
          appearance={{
            elements: {
              cardBox: "shadow-none border-0 p-0",
            },
          }}
        />
      </div>
    </div>
  );
}

