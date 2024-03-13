import { InteractionResponseType } from "https://deno.land/x/discord_api_types@0.37.71/v10.ts"
import { json } from "https://deno.land/x/sift@0.6.0/mod.ts"

export default async (callback: () => unknown) => {
  new Promise(callback).then((response) => {
    console.log("Deferred response sent")
    console.log(response)
  })
  return json({
    type: InteractionResponseType.DeferredChannelMessageWithSource,
  })
}
