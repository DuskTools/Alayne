"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const roll = new discord_js_1.SlashCommandBuilder()
    .setName('roll')
    .setDescription('Roll a number of dice in the Blades in the Dark system')
    .addIntegerOption((option) => option
    .setName('dice_pool')
    .setDescription('The number of dice to roll')
    .setMinValue(0)
    .setMaxValue(10)
    .setRequired(true));
const commands = [roll].map((command) => command.toJSON());
const rest = new discord_js_1.REST({ version: '10' }).setToken(process.env.TOKEN || 'NO_TOKEN');
rest
    .put(discord_js_1.Routes.applicationCommands(process.env.APP_ID || 'NO_APP_ID'), {
    body: commands
})
    .catch(console.error);
