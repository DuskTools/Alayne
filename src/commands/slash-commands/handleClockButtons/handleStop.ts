import { ButtonInteraction } from "discord.js";
import { buildClockMessageOptions } from "../utils/buildClockMessageOptions.js";
import { extractClockInfoFromButtonInteraction } from "../utils/extractClockInfoFromButtonInteraction.js";
import { clockNameLink } from "./clockNameLink.js";
import ClockService from "../../../../supabase/functions/_shared/services/ClockService.js";
import CampaignService from "../../../../supabase/functions/_shared/services/CampaignService.js";

export const handleStop = async (interaction: ButtonInteraction) => {
  const link = interaction.message.url;
  const discordGuildId = interaction.guildId || "";
  const clockOptions = await extractClockInfoFromButtonInteraction(interaction);

  await interaction.message.edit(
    buildClockMessageOptions({ ...clockOptions, active: false }),
  );
  await interaction.reply({
    content: `${clockNameLink(clockOptions.name, link)} **Stopped**`,
  });
  const campaign = await CampaignService.findOrCreateByDiscordId(
    discordGuildId,
  );
  await ClockService.updateClock({
    ...clockOptions,
    campaign_id: campaign.id,
    active: false,
  });
};
