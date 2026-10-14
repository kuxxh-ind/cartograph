"use client";

import React from "react";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import { Compass } from "lucide-react";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-6 mx-auto">
          <div className="flex items-center gap-6">
            <Link
              href="/workspace"
              className="flex items-center gap-2 font-semibold text-lg hover:opacity-90 transition-opacity"
            >
              <div className="p-1.5 rounded-lg bg-primary text-primary-foreground">
                <Compass className="w-5 h-5" />
              </div>
              <span className="tracking-tight">Cartograph</span>
            </Link>

            <div className="h-5 w-px bg-border" />

            <OrganizationSwitcher
              hidePersonal={false}
              afterCreateOrganizationUrl="/workspace"
              afterSelectOrganizationUrl="/workspace"
              afterLeaveOrganizationUrl="/workspace"
              afterSelectPersonalUrl="/workspace"
              appearance={{
                elements: {
                  rootBox: "flex items-center",
                  organizationSwitcherTrigger:
                    "py-1.5 px-3 rounded-lg border border-border bg-card hover:bg-muted text-foreground text-sm font-medium transition-colors flex items-center gap-2 shadow-xs",
                },
              }}
            />
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="h-5 w-px bg-border" />
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 rounded-full border border-border",
                },
              }}
            />
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col container mx-auto px-6 py-8">
        {children}
      </main>

      <footer className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        Cartograph &copy; {new Date().getFullYear()} &bull; Multi-Tenant Workspace Shell
      </footer>
    </div>
  );
}
