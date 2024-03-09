import { json, serve } from "https://deno.land/x/sift@0.6.0/mod.ts"

import { REST } from "npm:@discordjs/rest"
import { Routes } from "npm:discord-api-types/v10"

serve({
  "/send-message-to-notification-channel": sendMessageToNotificationChannel,
})

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
}

async function sendMessageToNotificationChannel(request: Request) {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  const { notification_channel, content } = await request.json() as {
    notification_channel: string
    content?: string
  }

  const discordRest = new REST({ version: "10" }).setToken(
    Deno.env.get("DISCORD_BOT_TOKEN")!,
  )

  await discordRest.post(
    Routes.channelMessages(notification_channel),
    {
      body: { content: content || "Hello, World!" },
    },
  )

  return json({ content: "ok" }, { status: 200 })
}
