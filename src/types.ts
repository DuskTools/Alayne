import { Database } from "../supabase/functions/_shared/database.types.js";

export type ClockUpdateParams =
  Database["public"]["Tables"]["clocks"]["Update"];
export type ClockCreateParams =
  Database["public"]["Tables"]["clocks"]["Insert"];
export type Clock = Database["public"]["Tables"]["clocks"]["Row"];
