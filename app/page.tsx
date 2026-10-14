import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  Show,
  UserButton,
} from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";
import { Compass, ArrowRight, ShieldCheck, Building2, Layers } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <div className="p-1.5 rounded-lg bg-primary text-primary-foreground">
              <Compass className="w-5 h-5" />
            </div>
            <span className="tracking-tight">Cartograph</span>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="h-5 w-px bg-border" />
            <Show when="signed-out">
              <SignInButton fallbackRedirectUrl="/workspace">
                <button className="px-4 py-2 rounded-lg text-sm font-medium border border-border bg-card hover:bg-muted transition-colors cursor-pointer">
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton fallbackRedirectUrl="/workspace">
                <button className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer">
                  Sign up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <Link
                href="/workspace"
                className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                Go to Workspace
                <ArrowRight className="w-4 h-4" />
              </Link>
              <UserButton />
            </Show>
          </div>
        </div>
      </header>

      {/* Hero Content */}
      <main className="flex-1 flex flex-col items-center justify-center container mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/60 text-xs font-medium text-muted-foreground mb-8">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Phase 1 &bull; Multi-Tenant Auth & Teams</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-3xl mb-6">
          System Architecture &amp; Codebase Mapping
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          Cartograph organizes your architecture into team workspaces. Sign in, join your organization, and explore system boundaries seamlessly.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Show when="signed-out">
            <SignUpButton fallbackRedirectUrl="/workspace">
              <button className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-base hover:opacity-90 transition-all flex items-center gap-2 shadow-sm cursor-pointer">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Link
              href="/workspace"
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-base hover:opacity-90 transition-all flex items-center gap-2 shadow-sm"
            >
              Open Workspace
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Show>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mt-20 text-left">
          <div className="p-6 rounded-2xl border border-border bg-card">
            <Building2 className="w-6 h-6 text-primary mb-3" />
            <h3 className="font-semibold text-base mb-1">Organization Workspaces</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every user belongs to an organization. Switch contexts seamlessly with zero setup friction.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card">
            <ShieldCheck className="w-6 h-6 text-primary mb-3" />
            <h3 className="font-semibold text-base mb-1">Server-Bound Identity</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Organization claims are readable during server rendering on first paint. Single token session.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card">
            <Layers className="w-6 h-6 text-primary mb-3" />
            <h3 className="font-semibold text-base mb-1">3-State Theme Engine</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Follow system defaults or force light/dark themes with immediate root-level CSS token evaluation.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        Cartograph &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
