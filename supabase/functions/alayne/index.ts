import {
  json,
  serve,
  validateRequest,
} from "https://deno.land/x/sift@0.6.0/mod.ts";
import { verifySignature } from "../_shared/utils.ts";

enum DiscordCommandType {
  Ping = 1,
  ApplicationCommand = 2,
}

enum SlashCommands {
  Clocks = "clocks",
  Clock = "clock",
  Roll = "roll",
}

serve({
  "/alayne": alayne,
});

// The main logic of the Discord Slash Command is defined in this function.
async function alayne(request: Request) {
  const { error } = await validateRequest(request, {
    POST: {
      headers: ["X-Signature-Ed25519", "X-Signature-Timestamp"],
    },
  });
  if (error) {
    return json({ error: error.message }, { status: error.status });
  }
  const { valid, body } = await verifySignature(request);
  if (!valid) {
    return json(
      { error: "Invalid request" },
      {
        status: 401,
      },
    );
  }

  const _foo = {
    app_permissions: "559623605571137",
    application_id: "1026293303584497704",
    channel: {
      flags: 0,
      guild_id: "1095080914222055456",
      id: "1120682924866555984",
      last_message_id: "1214181286659489843",
      name: "random",
      nsfw: false,
      parent_id: "1095080914914127873",
      permissions: "562949953421311",
      position: 6,
      rate_limit_per_user: 0,
      topic: null,
      type: 0,
    },
    channel_id: "1120682924866555984",
    data: { id: "1096302774402170892", name: "clocks", type: 1 },
    entitlement_sku_ids: [],
    entitlements: [],
    guild: {
      features: [
        "SOUNDBOARD",
        "CHANNEL_ICON_EMOJIS_GENERATED",
        "GUESTS_ENABLED",
      ],
      id: "1095080914222055456",
      locale: "en-US",
    },
    guild_id: "1095080914222055456",
    guild_locale: "en-US",
    id: "1214191014282264686",
    locale: "en-US",
    member: {
      avatar: null,
      communication_disabled_until: null,
      deaf: false,
      flags: 0,
      joined_at: "2023-04-10T20:20:35.669000+00:00",
      mute: false,
      nick: "Jarvis<GM>",
      pending: false,
      permissions: "562949953421311",
      premium_since: null,
      roles: ["1119291351763267705"],
      unusual_dm_activity_until: null,
      user: {
        avatar: "17cd71863637d9d5a671a9e606bd4913",
        avatar_decoration_data: null,
        discriminator: "0",
        global_name: "Thicc Uotan",
        id: "217437552125280256",
        public_flags: 4194304,
        username: "crassmenagerie",
      },
    },
    token: "",
    type: 2,
    version: 1,
  };

  const rawBody = JSON.parse(body);
  console.log("Raw Body");
  console.log(rawBody);
  const { type = 0, data = {} } = rawBody;
  // Discord performs Ping interactions to test our application.
  // Type 1 in a request implies a Ping interaction.
  if (type === DiscordCommandType.Ping) {
    return json({
      type: 1, // Type 1 in a response is a Pong interaction response type.
    });
  }

  // Type 2 in a request is an ApplicationCommand interaction.
  // It implies that a user has issued a command.
  if (type === DiscordCommandType.ApplicationCommand) {
    console.log(data);
    const { name } = data;

    switch (name) {
      case SlashCommands.Clocks:
        return json({
          type: 4,
          data: {
            content: `Hello, ${name}!`,
            flags: 1 << 6,
          },
        });
      case SlashCommands.Clock:
        return json({
          type: 4,
          data: {
            content: `Hello, ${name}!`,
            flags: 1 << 6,
          },
        });
      case SlashCommands.Roll:
        return json({
          type: 4,
          data: {
            content: `Hello, ${name}!`,
            flags: 1 << 6,
          },
        });
    }
  }

  return json({ error: "bad request" }, { status: 400 });
}
