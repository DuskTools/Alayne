"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChannels = void 0;
const discord_js_1 = require("discord.js");
async function createChannels({ guild, date, startTime, newRole, everyone, name, member, description, gameLocation }) {
    const category = await guild.channels.create({
        name,
        type: discord_js_1.ChannelType.GuildCategory,
        position: 2,
        permissionOverwrites: [
            {
                type: discord_js_1.OverwriteType.Role,
                id: newRole?.id || 'NO-ROLE',
                allow: [
                    discord_js_1.PermissionsBitField.Flags.ViewChannel,
                    discord_js_1.PermissionsBitField.Flags.SendMessages
                ]
            },
            {
                type: discord_js_1.OverwriteType.Role,
                id: everyone?.id || 'NO-ROLE',
                deny: [discord_js_1.PermissionsBitField.Flags.ViewChannel]
            }
        ]
    });
    const details = await guild.channels.create({
        name: 'details',
        type: discord_js_1.ChannelType.GuildText,
        position: 1,
        parent: category.id
    });
    await guild.channels.create({
        name: 'general',
        type: discord_js_1.ChannelType.GuildText,
        position: 2,
        topic: 'Get to know one another - before the bloodshed.',
        parent: category.id
    });
    await guild.channels.create({
        name: 'faction-selection',
        type: discord_js_1.ChannelType.GuildText,
        position: 3,
        topic: 'Discuss what factions are worthy of your glory',
        parent: category.id
    });
    await guild.channels.create({
        name: 'game-logistics',
        type: discord_js_1.ChannelType.GuildText,
        position: 4,
        topic: 'Hash out the nitty-gritty',
        parent: category.id
    });
    await guild.channels.create({
        name: 'questions',
        type: discord_js_1.ChannelType.GuildText,
        position: 5,
        topic: 'Confused about the rules? Got something you need to know? Ask away!',
        parent: category.id
    });
    const message = [
        `Game Details:`,
        `Host: ${member.toString()}`,
        `Where: ${gameLocation}`,
        `When: ${date.toLocaleDateString('en-us', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })} @ ${startTime}`,
        '-------------------',
        description
    ].join('\n');
    details.send(message).then((msg) => msg.pin());
}
exports.createChannels = createChannels;
