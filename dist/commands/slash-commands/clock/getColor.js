"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColor = void 0;
const discord_js_1 = require("discord.js");
const getColor = (progress, segment) => {
    const ratio = progress / segment;
    switch (true) {
        case ratio < 0.3333:
            return discord_js_1.Colors.Green;
        case ratio < 0.6666:
            return discord_js_1.Colors.Yellow;
        case ratio < 1:
            return discord_js_1.Colors.Red;
        default:
            return discord_js_1.Colors.DarkRed;
    }
};
exports.getColor = getColor;
