"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSignupMessage = void 0;
const constants_1 = require("../../../constants");
async function sendSignupMessage({ guild, description, date, startTime, channel, member, newRole }) {
    const content = [
        guild.roles.everyone.toString(),
        '**THE GALAXY STIRS...**',
        '============================',
        `New Game Announcement: ${newRole.toString()} `,
        `${date.toLocaleDateString('en-us', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })} @ ${startTime}`,
        '-----------------------------------------------',
        description ? description.toString() : null,
        '-----------------------------------------------',
        'RSVP using the reactions below:',
        ' - ✅: Sign me up!',
        ' - ❔: Interested, but not sure if I can make it',
        " - ⛔: Can't Make It"
    ]
        .filter((line) => line != null)
        .join('\n');
    const message = await channel.send(content);
    message.react(constants_1.ApprovalEmoji);
    message.react(constants_1.MaybeEmoji);
    message.react(constants_1.RejectEmoji);
}
exports.sendSignupMessage = sendSignupMessage;
