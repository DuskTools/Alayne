"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slashCommands = void 0;
const index_1 = require("./roll/index");
const index_2 = require("./clock/index");
const index_3 = require("./handleClockButtons/index");
const index_4 = require("./clocks/index");
function slashCommands(client) {
    (0, index_3.handleClockButtons)(client);
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isChatInputCommand())
            return;
        const { commandName } = interaction;
        if (commandName === 'roll') {
            (0, index_1.roll)(interaction);
        }
        if (commandName === 'clocks') {
            (0, index_4.clocks)(interaction);
        }
        if (commandName === 'clock') {
            await (0, index_2.clock)(interaction);
        }
    });
}
exports.slashCommands = slashCommands;
