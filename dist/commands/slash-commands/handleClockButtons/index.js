import { Events } from 'discord.js';
import { handleIncrement } from './handleIncrement.js';
import { handleDecrement } from './handleDecrement.js';
import { handleStop } from './handleStop.js';
import { handleRestart } from './handleRestart.js';
export const handleClockButtons = async (client) => {
    client.on(Events.InteractionCreate, async (interaction) => {
        if (!interaction.isButton())
            return;
        if (interaction.customId.startsWith('bitdclock--increment')) {
            handleIncrement(interaction);
        }
        if (interaction.customId.startsWith('bitdclock--decrement')) {
            handleDecrement(interaction);
        }
        if (interaction.customId.startsWith('bitdclock--stop')) {
            handleStop(interaction);
        }
        if (interaction.customId.startsWith('bitdclock--start')) {
            handleRestart(interaction);
        }
    });
};
