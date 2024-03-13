import { InteractionResponseType } from "https://deno.land/x/discord_api_types@0.37.71/v10.ts"
import { json } from "https://deno.land/x/sift@0.6.0/mod.ts"

export default (callback: () => void) => {
  new Promise(callback)
  return json({
    type: InteractionResponseType.DeferredChannelMessageWithSource,
  })
}
