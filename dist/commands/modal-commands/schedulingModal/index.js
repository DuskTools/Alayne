"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schedulingModal = void 0;
const formatDate_1 = require("./formatDate");
const sendSignupMessage_1 = require("./sendSignupMessage");
const createChannels_1 = require("./createChannels");
const createGameRole_1 = require("./createGameRole");
async function schedulingModal(interaction) {
    const { guild, fields, member } = interaction;
    if (guild == null || member == null) {
        console.error('Guid or Member not found.');
        await interaction.reply({
            content: "It looks like ERWIN can't find the Guild or Member for this server.",
            ephemeral: true
        });
        return;
    }
    const channel = guild.channels.cache.get(process.env.SIGNUP_CHANNEL_ID || 'NO_SIGNUP_CHANNEL_ID');
    if (!channel?.isTextBased()) {
        console.error('Game Signup channel not found, or is not text based.');
        await interaction.reply({
            content: "It looks like ERWin can't find the Signup channel.",
            ephemeral: true
        });
        return;
    }
    await interaction.reply({ content: 'Initializing...', ephemeral: true });
    const rolelessGameContext = {
        guild,
        channel,
        member,
        name: fields.getTextInputValue('name').replace('@', ''),
        description: fields.getTextInputValue('description'),
        gameLocation: fields.getTextInputValue('gameLocation'),
        startTime: fields.getTextInputValue('startTime'),
        date: (0, formatDate_1.formatDate)(fields.getTextInputValue('date')),
        everyone: guild.roles.everyone
    };
    const dateFormattedCorrectly = rolelessGameContext.date.toString() != 'Invalid Date';
    const dateIsInFuture = rolelessGameContext.date > new Date();
    const dateValid = dateFormattedCorrectly && dateIsInFuture;
    if (!dateValid) {
        await interaction.followUp({
            content: `\`${fields.getTextInputValue('date')}\` is not a valid date. Be sure to use DD/MM/YY, and be sure the date is in the future.`,
            ephemeral: true
        });
        return;
    }
    const newRole = await (0, createGameRole_1.createGameRole)(rolelessGameContext);
    const gameContext = {
        ...rolelessGameContext,
        newRole
    };
    const memberRoles = member.roles;
    memberRoles.add(newRole);
    await (0, createChannels_1.createChannels)(gameContext);
    await (0, sendSignupMessage_1.sendSignupMessage)(gameContext);
}
exports.schedulingModal = schedulingModal;
