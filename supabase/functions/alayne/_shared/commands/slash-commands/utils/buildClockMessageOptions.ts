import {
  APIEmbedField,
  ComponentType,
} from "https://deno.land/x/discord_api_types@0.37.71/v10.ts"
import { Clock } from "../../../../../_shared/supabase/types.ts"
import Colors from "../../../../../_shared/Colors.ts"
import { EmbedBuilder } from "npm:@discordjs/builders"

const clockImage = (progress: number, segment: number) =>
  `https://raw.githubusercontent.com/DuskTools/DuskFunctions/main/supabase/functions/_shared/assets/clocks/${segment}/${progress}.png`

const getColor = (progress: number, segment: number, active: boolean) => {
  const ratio = progress / segment

  switch (true) {
    case !active:
      return Colors.Red
    case ratio < 0.3333:
      return Colors.Green
    case ratio < 0.6666:
      return Colors.Yellow
    case ratio < 1:
      return Colors.Red
    default:
      return Colors.DarkRed
  }
}

export const buildClockMessageOptions = ({
  name,
  segments,
  progress = 0,
  active,
  link,
}:
  & Omit<Clock["Row"], "campaign_id" | "link" | "id" | "created_at">
  & Partial<Pick<Clock["Row"], "link">>) => {
  const fields: APIEmbedField[] = [
    {
      name: "Progress",
      value: `${progress}/${segments}`,
    },
  ]

  if (link) {
    fields.push({
      name: " ",
      value: `[Jump To Clock](${link})`,
    })
  }

  const embed = new EmbedBuilder()
    .setTitle(name)
    .setThumbnail(clockImage(progress, segments))
    .setColor(getColor(progress, segments, active))
    .addFields(fields)

  return {
    embeds: [embed],
    components: [{ type: ComponentType.ActionRow }],
  }
}
