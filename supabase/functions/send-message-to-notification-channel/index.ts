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

  console.log("Before")
  const { notification_channel } = await request.json() as {
    notification_channel: string
  }
  console.log("Notification Channel: " + notification_channel)

  const discordRest = new REST({ version: "10" }).setToken(
    Deno.env.get("DISCORD_BOT_TOKEN")!,
  )

  await discordRest.post(
    Routes.channelMessages(notification_channel),
    {
      body: "Hello, World!",
    },
  )

  return json({ content: "ok" }, { status: 200 })
}
