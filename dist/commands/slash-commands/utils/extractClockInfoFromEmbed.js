"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractClockInfoFromEmbed = void 0;
const extractClockInfoFromEmbed = (embed) => {
    const name = String(embed.title);
    const totalProgress = embed.fields.find(({ name }) => name === 'Progress')?.value;
    if (!totalProgress) {
        throw new Error('Could not find progress');
    }
    const [progress, segments] = totalProgress.split('/').map(Number);
    return { name, segments, progress };
};
exports.extractClockInfoFromEmbed = extractClockInfoFromEmbed;
