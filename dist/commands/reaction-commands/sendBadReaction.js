"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleBadReaction = void 0;
function handleBadReaction(origin, user, emoji) {
    origin.message.reactions.cache.get(emoji)?.remove();
    const content = [
        `**Electronic Response WINarran Automated Alert**`,
        `RE: ${origin.message.url}`,
        'IDENTIFIED INVALID RESPONSE:',
        emoji,
        '',
        'Try Harder.',
        '- ERWin'
    ].join('\n');
    user.send(content);
}
exports.handleBadReaction = handleBadReaction;
