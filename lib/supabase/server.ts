import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";
import { env } from "../env";

/**
 * Creates a Supabase client for Server Components, Server Actions, or Route Handlers
 * that carries the active Clerk session JWT in the Authorization header.
 *
 * This ensures Supabase Row Level Security (RLS) policies can evaluate identity
 * and active organization claims directly from the token without separate Supabase sessions.
 */
export async function createClerkSupabaseServerClient() {
  const { getToken } = await auth();

  return createClient(
    env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key",
    {
      accessToken: async () => {
        return (await getToken()) ?? null;
      },
    }
  );
}

