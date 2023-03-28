"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSignupReaction = void 0;
const constants_1 = require("../../constants");
const handleApproval_1 = require("./handleApproval");
const sendBadReaction_1 = require("./sendBadReaction");
async function handleSignupReaction(origin, user, role) {
    const emoji = origin.emoji.name || '✨';
    if (!constants_1.SignupReactionEmoji.includes(emoji)) {
        (0, sendBadReaction_1.handleBadReaction)(origin, user, emoji);
        return;
    }
    constants_1.SignupReactionEmoji.filter((reaction) => emoji != reaction).forEach((reaction) => {
        origin.message.reactions.cache.get(reaction)?.users.remove(user);
    });
    const member = origin.message.guild?.members.cache.get(user.id);
    if (origin.emoji.name == constants_1.ApprovalEmoji) {
        (0, handleApproval_1.handleApproval)(origin, member, role);
        return;
    }
    member.roles.remove(role);
}
exports.handleSignupReaction = handleSignupReaction;
