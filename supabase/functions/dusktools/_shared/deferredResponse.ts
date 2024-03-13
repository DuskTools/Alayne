import { InteractionResponseType } from "https://deno.land/x/discord_api_types@0.37.71/v10.ts"
import { json } from "https://deno.land/x/sift@0.6.0/mod.ts"

export default (callback: () => Promise<Record<string, unknown>>) => {
  Promise.resolve(callback()).then((response) => {
    console.log("Inside Deferred response")
    console.log(response)
  })
  console.log("Initial response")

  return json({
    type: InteractionResponseType.DeferredChannelMessageWithSource,
  })
}
