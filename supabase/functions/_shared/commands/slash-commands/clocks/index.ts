import { json } from "https://deno.land/x/sift@0.6.0/mod.ts";
import {
  InteractionResponseType,
} from "https://deno.land/x/discord_api_types/v10.ts";
import { APIInteraction } from "https://deno.land/x/discord_api_types@0.37.71/v10.ts";

import ClockService from "../../../services/ClockService.ts";
import CampaignService from "../../../services/CampaignService.ts";
import { buildClockMessageOptions } from "../utils/buildClockMessageOptions.ts";

const handleClocks = async (interaction: APIInteraction) => {
  const guildId = interaction.guild_id!;
  const campaign = await CampaignService.findOrCreateByDiscordId(
    guildId,
  );
  const clocks = await ClockService.getActiveClocks(campaign.id);
  const embeds = clocks.map((clockOptions) => {
    return buildClockMessageOptions(clockOptions).embeds[0];
  });

  const content = embeds.length > 0
    ? { embeds }
    : { content: "No clocks found!" };

  return json({
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      ...content,
      flags: 1 << 6,
    },
  });
};

export default handleClocks;
