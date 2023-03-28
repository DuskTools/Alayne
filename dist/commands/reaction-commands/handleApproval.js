"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleApproval = void 0;
async function handleApproval(origin, member, role) {
    member.roles.add(role);
    const categoryChannel = origin.message.guild?.channels.cache
        .filter((channel) => channel.name == role.name)
        .first();
    const detailsChannel = categoryChannel.children.cache
        .filter((channel) => channel.name == 'details')
        .first();
    const pinnedMessages = await detailsChannel.messages.fetchPinned();
    const pinnedMessage = pinnedMessages
        .filter((message) => message.author.id == process.env.APP_ID)
        .first();
    const content = [
        `Thank you for joining the Game!`,
        `See here for more details: ${pinnedMessage.url}`
    ].join('\n');
    member.send(content);
}
exports.handleApproval = handleApproval;
