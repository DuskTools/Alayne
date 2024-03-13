import { json, serve } from "https://deno.land/x/sift@0.6.0/mod.ts"

import { Routes } from "npm:discord-api-types/v10"
import discordRest from "../dusktools/_shared/discordRest.ts"
import corsResponse from "../dusktools/_shared/corsResponse.ts"

serve({
  "/send-message-to-notification-channel": sendMessageToNotificationChannel,
})

async function sendMessageToNotificationChannel(request: Request) {
  if (request.method === "OPTIONS") {
    return corsResponse()
  }

  const { notification_channel, content } = await request.json() as {
    notification_channel: string
    content?: string
  }
  console.log(notification_channel)
  console.log(content)

  await discordRest.post(
    Routes.channelMessages(notification_channel),
    {
      body: { content: content || "Hello, World!" },
    },
  )

  return json({ content: "ok" }, { status: 200 })
}
