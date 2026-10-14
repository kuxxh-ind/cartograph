"use client";

import { createClient } from "@supabase/supabase-js";
import { useSession } from "@clerk/nextjs";
import { useMemo } from "react";
import { env } from "../env";

/**
 * Hook to get a Supabase client in Client Components carrying the active Clerk session JWT.
 */
export function useClerkSupabaseClient() {
  const { session } = useSession();

  return useMemo(() => {
    return createClient(
      env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key",
      {
        accessToken: async () => {
          return (await session?.getToken()) ?? null;
        },
      }
    );
  }, [session]);
}

