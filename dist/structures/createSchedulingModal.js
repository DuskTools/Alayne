"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchedulingModal = exports.SchedulingModalId = void 0;
const discord_js_1 = require("discord.js");
exports.SchedulingModalId = 'gameScheduler';
function createSchedulingModal() {
    const modal = new discord_js_1.ModalBuilder()
        .setCustomId(exports.SchedulingModalId)
        .setTitle('Schedule Game');
    const inputs = [
        new discord_js_1.TextInputBuilder()
            .setCustomId('name')
            .setLabel('What is the Short name (role)')
            .setPlaceholder('Oct2022')
            .setStyle(discord_js_1.TextInputStyle.Short)
            .setRequired(true),
        new discord_js_1.TextInputBuilder()
            .setCustomId('date')
            .setLabel('What Date is the game?')
            .setPlaceholder('MM/DD/YY')
            .setStyle(discord_js_1.TextInputStyle.Short)
            .setRequired(true),
        new discord_js_1.TextInputBuilder()
            .setCustomId('startTime')
            .setLabel('When will the game kick-off?')
            .setPlaceholder('HH:MM AM')
            .setValue('10:00 AM')
            .setStyle(discord_js_1.TextInputStyle.Short)
            .setRequired(true),
        new discord_js_1.TextInputBuilder()
            .setCustomId('gameLocation')
            .setLabel('Location of event')
            .setPlaceholder('123 Main Street')
            .setStyle(discord_js_1.TextInputStyle.Short)
            .setRequired(true),
        new discord_js_1.TextInputBuilder()
            .setCustomId('description')
            .setLabel('Any Special description?')
            .setStyle(discord_js_1.TextInputStyle.Paragraph)
            .setRequired(false)
    ];
    const components = inputs.map((input) => new discord_js_1.ActionRowBuilder().addComponents(input));
    modal.addComponents(components);
    return modal;
}
exports.createSchedulingModal = createSchedulingModal;
