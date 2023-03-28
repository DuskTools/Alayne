"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slashCommands = void 0;
const roll_1 = require("./roll");
function slashCommands(client) {
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isChatInputCommand())
            return;
        const { commandName } = interaction;
        if (commandName === 'roll') {
            (0, roll_1.roll)(interaction);
        }
    });
}
exports.slashCommands = slashCommands;
