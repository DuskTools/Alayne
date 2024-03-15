import { adminClient } from "../supabase/index.ts"
import { Clock } from "../supabase/types.ts"

async function create(clockParams: Clock["Insert"]) {
  const { data, error } = await adminClient
    .from("clocks")
    .insert(clockParams)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data!
}

async function getActiveClocks(campaign_id: string) {
  const { data, error } = await adminClient
    .from("clocks")
    .select()
    .eq("campaign_id", campaign_id)
    .eq("active", true)

  if (error) {
    throw error
  }

  return data
}

async function getClock({
  campaign_id,
  name,
}: Pick<Clock["Row"], "name" | "campaign_id">) {
  const { data, error } = await adminClient
    .from("clocks")
    .select()
    .eq("campaign_id", campaign_id!)
    .eq("name", name)
    .limit(1)
    .single()

  if (error) {
    throw error
  }

  if (!data) {
    throw new Error("No Clock found")
  }

  return data
}

async function updateClock(
  options:
    & Clock[
      "Update"
    ]
    & Pick<Clock["Row"], "name" | "campaign_id">,
) {
  const { data, error } = await adminClient
    .from("clocks")
    .update(options)
    .eq("campaign_id", options.campaign_id!)
    .eq("name", options.name)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data!
}

export default {
  updateClock,
  getClock,
  create,
  getActiveClocks,
}
