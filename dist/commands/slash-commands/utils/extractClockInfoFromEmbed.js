export const extractClockInfoFromEmbed = (embed) => {
    const name = String(embed.title);
    const totalProgress = embed.fields.find(({ name }) => name === 'Progress')?.value;
    const link = embed.fields.find(({ name }) => name === ' ')?.value;
    const footerText = embed.footer?.text;
    if (!totalProgress) {
        throw new Error('Could not find progress');
    }
    const [progress, segments] = totalProgress.split('/').map(Number);
    return { name, segments, progress, link, footerText };
};
