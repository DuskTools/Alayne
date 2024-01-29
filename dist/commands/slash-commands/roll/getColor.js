import { Colors } from 'discord.js';
export const getColor = (type) => {
    switch (type) {
        case 'critical':
            return Colors.Gold;
        case 'success':
            return Colors.Green;
        case 'partial':
            return Colors.Yellow;
        case 'failure':
            return Colors.Red;
    }
};
