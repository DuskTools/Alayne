// Import the functions you need from the SDKs you need
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { Database } from "./database.types.ts"

const URL = Deno.env.get("SUPABASE_URL")!
const ANON = Deno.env.get("SUPABASE_ANON_KEY")!
const ADMIN = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!

export const anonClient = createClient<Database>(
  URL,
  ANON,
)

export const adminClient = createClient<Database>(
  URL,
  ADMIN,
)
