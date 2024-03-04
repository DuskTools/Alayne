// Import the functions you need from the SDKs you need
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Database } from "../database.types.ts";

const URL = Deno.env.get("DISCORD_PUBLIC_KEY")!;
const ANON = Deno.env.get("SUPABASE_PUBLIC_ANON_KEY")!;
const ADMIN = Deno.env.get("SUPABASE_ADMIN_KEY")!;

export const anonClient = createClient<Database>(
  URL,
  ANON,
);

export const adminClient = createClient<Database>(
  URL,
  ADMIN,
);
