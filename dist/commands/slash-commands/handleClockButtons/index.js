"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleClockButtons = void 0;
const discord_js_1 = require("discord.js");
const handleIncrement_1 = require("./handleIncrement");
const handleDecrement_1 = require("./handleDecrement");
const handleStop_1 = require("./handleStop");
const handleRestart_1 = require("./handleRestart");
const handleClockButtons = async (client) => {
    client.on(discord_js_1.Events.InteractionCreate, async (interaction) => {
        if (!interaction.isButton())
            return;
        if (interaction.customId.startsWith('bitdclock--increment')) {
            (0, handleIncrement_1.handleIncrement)(interaction);
        }
        if (interaction.customId.startsWith('bitdclock--decrement')) {
            (0, handleDecrement_1.handleDecrement)(interaction);
        }
        if (interaction.customId.startsWith('bitdclock--stop')) {
            (0, handleStop_1.handleStop)(interaction);
        }
        if (interaction.customId.startsWith('bitdclock--start')) {
            (0, handleRestart_1.handleRestart)(interaction);
        }
    });
};
exports.handleClockButtons = handleClockButtons;
