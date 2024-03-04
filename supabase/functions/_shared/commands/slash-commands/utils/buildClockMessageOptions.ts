import {
  APIEmbedField,
  ButtonStyle,
  ComponentType,
} from "https://deno.land/x/discord_api_types@0.37.71/v10.ts";
import { Clock } from "../../../types.ts";
import Colors from "../../../Colors.ts";

const clockImage = (progress: number, segment: number) =>
  `https://raw.githubusercontent.com/alxjrvs/bladesinthediscord/main/src/assets/clocks/${segment}/${progress}.png`;

const getColor = (progress: number, segment: number, active: boolean) => {
  const ratio = progress / segment;

  switch (true) {
    case !active:
      return Colors.Red;
    case ratio < 0.3333:
      return Colors.Green;
    case ratio < 0.6666:
      return Colors.Yellow;
    case ratio < 1:
      return Colors.Red;
    default:
      return Colors.DarkRed;
  }
};

export const buildClockMessageOptions = ({
  name,
  segments,
  progress = 0,
  active,
  link,
}:
  & Omit<Clock, "campaign_id" | "link" | "id" | "created_at">
  & Partial<Pick<Clock, "link">>) => {
  const fields: APIEmbedField[] = [
    {
      name: "Progress",
      value: `${progress}/${segments}`,
    },
  ];

  if (link) {
    fields.push({
      name: " ",
      value: `[Jump To Clock](${link})`,
    });
  }

  const embed = {
    title: name,
    thumbnail: { url: clockImage(progress, segments) },
    color: getColor(progress, segments, active),
    fields,
  };

  const showStop = active;
  const showDecrement = showStop && progress > 0 && progress <= segments;
  const showIncrement = showStop && progress < segments;
  const showRestart = progress < segments && !active;

  const buttons = [
    showIncrement &&
    {
      custom_id: `bitdclock--increment`,
      label: "+",
      style: ButtonStyle.Primary,
      type: ComponentType.Button,
    },
    showDecrement &&
    {
      custom_id: `bitdclock--decrement`,
      label: "-",
      style: ButtonStyle.Secondary,
      type: ComponentType.Button,
    },
    showRestart &&
    {
      custom_id: `bitdclock--start`,
      label: "Restart",
      style: ButtonStyle.Primary,
      type: ComponentType.Button,
    },
    showStop &&
    {
      custom_id: `bitdclock--stop`,
      label: "Stop",
      style: ButtonStyle.Danger,
      type: ComponentType.Button,
    },
  ].filter((button) => button !== false);
  console.log(buttons);

  return {
    embeds: [embed],
    components: [{ type: ComponentType.ActionRow, components: buttons }],
  };
};
