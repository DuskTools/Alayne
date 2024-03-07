import {
  json,
  serve,
  validateRequest,
} from "https://deno.land/x/sift@0.6.0/mod.ts";
import { verifySignature } from "./_shared/utils.ts";

import {
  APIInteraction,
  InteractionType,
} from "https://deno.land/x/discord_api_types/v10.ts";
import handleClocks from "./_shared/commands/slash-commands/clocks/index.ts";
import { handleRoll } from "./_shared/commands/slash-commands/roll/index.ts";

enum SlashCommands {
  Clocks = "clocks",
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

  const rawBody: APIInteraction = JSON.parse(body);
  if (rawBody.type === InteractionType.Ping) {
    return json({
      type: 1, // Type 1 in a response is a Pong interaction response type.
    });
  }

  if (rawBody.type === InteractionType.ApplicationCommand) {
    switch (rawBody.data.name) {
      case SlashCommands.Clocks:
        return handleClocks(rawBody);
      case SlashCommands.Roll:
        return handleRoll(rawBody);
    }
  }

  return json({ error: "bad request" }, { status: 400 });
}
