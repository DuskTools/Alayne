import { json, serve } from "https://deno.land/x/sift@0.6.0/mod.ts"

// import { REST } from "npm:@discordjs/rest"
// import { Routes } from "npm:discord-api-types/v10"

import { anonClient } from "../_shared/supabase/index.ts"

serve({
  "/discord-user-payload": discordUserPayload,
})

type RequestBody = {
  id: string
}

type DiscordResponse = {
  campaigns: unknown[]
}

async function discordUserPayload(request: Request) {
  const body: RequestBody = JSON.parse(await request.text())
  const { data, error } = await anonClient
    .from("users")
    .select()
    .eq("id", body.id)
    .single()

  if (error) {
    return json(error, { status: 500 })
  }

  return json({ data })

  // try {
  //   const discordRest = new REST({ version: "10" }).setToken(data.discord_token)
  //   const guilds = await discordRest.get(Routes.userGuilds())

  //   const response: DiscordResponse = {
  //     campaigns: guilds as unknown[],
  //   }
  //   return json(response)
  // } catch (e) {
  //   return json({ message: `Error fetching user guilds: ${e}` }, {
  //     status: 500,
  //   })
  // }
}
