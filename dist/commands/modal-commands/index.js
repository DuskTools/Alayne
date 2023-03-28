"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modalCommands = void 0;
const createSchedulingModal_1 = require("../slash-commands/activate/createSchedulingModal");
const schedulingModal_1 = require("./schedulingModal");
async function modalCommands(client) {
    client.on('interactionCreate', (interaction) => {
        if (!interaction.isModalSubmit())
            return;
        const { customId } = interaction;
        if (customId == createSchedulingModal_1.SchedulingModalId) {
            (0, schedulingModal_1.schedulingModal)(interaction);
        }
    });
}
exports.modalCommands = modalCommands;
