"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slashCommands = void 0;
const roll_1 = require("./roll");
const clock_1 = require("./clock");
const handleClockButtons_1 = require("./handleClockButtons");
const clocks_1 = require("./clocks");
function slashCommands(client) {
    (0, handleClockButtons_1.handleClockButtons)(client);
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isChatInputCommand())
            return;
        const { commandName } = interaction;
        if (commandName === 'roll') {
            (0, roll_1.roll)(interaction);
        }
        if (commandName === 'clocks') {
            (0, clocks_1.clocks)(interaction);
        }
        if (commandName === 'clock') {
            await (0, clock_1.clock)(interaction);
        }
    });
}
exports.slashCommands = slashCommands;
