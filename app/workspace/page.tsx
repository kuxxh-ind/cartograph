import { auth, clerkClient } from "@clerk/nextjs/server";
import { OrgAutoSelector } from "@/components/org-auto-selector";
import { ShieldCheck, Users, Compass } from "lucide-react";

export default async function WorkspacePage() {
  const { userId, orgId, orgRole, orgSlug } = await auth();

  if (!userId) {
    return null;
  }

  let orgDetails: {
    id: string;
    name: string;
    slug: string | null;
    membersCount: number;
  } | null = null;

  if (orgId) {
    try {
      const client = await clerkClient();
      const org = await client.organizations.getOrganization({
        organizationId: orgId,
      });
      orgDetails = {
        id: org.id,
        name: org.name,
        slug: org.slug,
        membersCount: org.membersCount ?? 1,
      };
    } catch (err) {
      console.error("Failed to fetch organization details server-side:", err);
    }
  }

  if (!orgId || !orgDetails) {
    return <OrgAutoSelector userId={userId} />;
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto w-full">
      {/* Workspace Header - Server Rendered on First Paint */}
      <div className="p-8 rounded-2xl border border-border bg-card shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-2xl shadow-sm">
              {orgDetails.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">
                  {orgDetails.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border">
                  {orgSlug || "no-slug"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Role: <strong className="font-semibold text-foreground">{orgRole}</strong>
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-blue-500" />
                  Members: <strong className="font-semibold text-foreground">{orgDetails.membersCount}</strong>
                </span>
              </p>
            </div>
          </div>
          <div className="text-xs text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-lg border border-border font-mono">
            Org ID: {orgDetails.id}
          </div>
        </div>
      </div>

      {/* Workspace Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 font-medium text-sm text-muted-foreground mb-2">
            <Compass className="w-4 h-4" />
            <span>Active Context</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{orgDetails.name}</p>
          <p className="text-xs text-muted-foreground mt-2">
            Server-rendered organization claims ready for downstream database authorization.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 font-medium text-sm text-muted-foreground mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Session Identity</span>
          </div>
          <p className="text-sm font-semibold truncate text-foreground">{userId}</p>
          <p className="text-xs text-muted-foreground mt-2">
            Single session provider. Tokens carry active org ID with Supabase client.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 font-medium text-sm text-muted-foreground mb-2">
            <Users className="w-4 h-4" />
            <span>Team Members</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{orgDetails.membersCount}</p>
          <p className="text-xs text-muted-foreground mt-2">
            Use the Organization Switcher in the top header to invite members or manage settings.
          </p>
        </div>
      </div>
    </div>
  );
}

