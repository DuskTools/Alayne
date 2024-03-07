import { adminClient } from "../supabase/index.ts"
import {
  Clock,
  ClockCreateParams,
  ClockUpdateParams,
} from "../supabase/types.ts"

async function create(clockParams: ClockCreateParams) {
  const { data, error } = await adminClient
    .from("clocks")
    .insert(clockParams)
    .select()
    .single()

  if (error) {
    console.log("Create clock error")
    console.log(error.message)
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
    console.log("get active clocks error")
    console.log(error.message)
  }

  return data!
}

async function getClock({
  campaign_id,
  name,
}: Pick<Clock, "name" | "campaign_id">) {
  const { data, error } = await adminClient
    .from("clocks")
    .select()
    .eq("campaign_id", campaign_id)
    .eq("name", name)
    .limit(1)
    .single()

  if (error) {
    console.log("get clock error")
    console.log(error.message)
  }

  if (!data) {
    throw new Error("No Clock found")
  }

  return data
}

async function updateClock(
  options: ClockUpdateParams & Pick<Clock, "name" | "campaign_id">,
) {
  const { data, error } = await adminClient
    .from("clocks")
    .update(options)
    .eq("campaign_id", options.campaign_id)
    .eq("name", options.name)
    .select()
    .single()

  if (error) {
    console.log("update clock error")
    console.log(error.message)
  }

  return data!
}

export default {
  updateClock,
  getClock,
  create,
  getActiveClocks,
}
