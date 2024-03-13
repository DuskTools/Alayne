import { serve } from "https://deno.land/x/sift@0.6.0/mod.ts"

import { Routes } from "npm:discord-api-types/v10"
import discordRest from "../dusktools/_shared/discordRest.ts"
import corsResponse from "../dusktools/_shared/corsResponse.ts"
import { DeferredResponseArgs } from "../dusktools/_shared/types.ts"

serve({
  "/update-deferred-discord-message": updateDeferredDiscordMessage,
})

async function updateDeferredDiscordMessage(request: Request) {
  if (request.method === "OPTIONS") {
    return corsResponse()
  }

  const { application_id, interaction_token, body } = await request
    .json() as DeferredResponseArgs

  console.log(application_id)
  console.log(interaction_token)
  console.log(JSON.stringify(body))

  const route = `${
    Routes.webhook(application_id, interaction_token)
  }/messages/@original` as `/${string}`

  await discordRest.patch(
    route,
    { body },
  )

  return new Response("ok", { status: 200 })
}
