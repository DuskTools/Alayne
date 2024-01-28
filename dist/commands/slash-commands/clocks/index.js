"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clocks = void 0;
const tslib_1 = require("tslib");
const buildClockMessageOptions_1 = require("../utils/buildClockMessageOptions");
const ClockService_1 = tslib_1.__importDefault(require("../../../services/ClockService"));
const clocks = async (interaction) => {
    await interaction.deferReply({ ephemeral: true });
    const clocks = await ClockService_1.default.getClocks();
    const embeds = clocks.map((clockOptions) => {
        return (0, buildClockMessageOptions_1.buildClockMessageOptions)(clockOptions).embeds[0];
    });
    if (embeds.length > 0) {
        interaction.editReply({ embeds });
    }
    else {
        interaction.editReply({ content: 'No clocks found!' });
    }
};
exports.clocks = clocks;
