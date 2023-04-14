"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColor = void 0;
const discord_js_1 = require("discord.js");
const getColor = (type) => {
    switch (type) {
        case 'critical':
            return discord_js_1.Colors.Gold;
        case 'success':
            return discord_js_1.Colors.Green;
        case 'partial':
            return discord_js_1.Colors.Yellow;
        case 'failure':
            return discord_js_1.Colors.Red;
    }
};
exports.getColor = getColor;
