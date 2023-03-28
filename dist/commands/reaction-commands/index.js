"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactionCommands = void 0;
const handleSignupReaction_1 = require("./handleSignupReaction");
async function reactionCommands(client) {
    client.on('messageReactionAdd', async (origin, user) => {
        if (origin.partial) {
            try {
                await origin.fetch();
            }
            catch (error) {
                console.error('Something went wrong when fetching the message:', error);
                return;
            }
        }
        if (user.partial) {
            try {
                await user.fetch();
            }
            catch (error) {
                console.error('Something went wrong when fetching the user:', error);
                return;
            }
        }
        const isSignupChannel = origin.message.channel.id == process.env.SIGNUP_CHANNEL_ID;
        const isBotMessage = origin.message.author?.id == process.env.APP_ID;
        const isBotReaction = origin.message.author?.id == user.id;
        const role = origin.message.mentions.roles.first();
        const isValidSignupReaction = isSignupChannel && isBotMessage && role && !isBotReaction;
        if (isValidSignupReaction) {
            (0, handleSignupReaction_1.handleSignupReaction)(origin, user, role);
        }
    });
}
exports.reactionCommands = reactionCommands;
