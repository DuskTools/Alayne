import { json, serve } from "https://deno.land/x/sift@0.6.0/mod.ts"

import { REST } from "npm:@discordjs/rest"
import { Routes } from "npm:discord-api-types/v10"

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

  try {
    const guilds = await fetch(
      `https://discord.com/api${Routes.userGuilds()}`,
      {
        headers: { Authorization: `Bearer ${data.discord_token}` },
      },
    )
    return json({ guilds })

    // const response: DiscordResponse = {
    //   campaigns: guilds as unknown[],
    // }
    // return json(response)
  } catch (e) {
    return json({ message: `Error fetching user guilds: ${e}` }, {
      status: 500,
    })
  }
}
