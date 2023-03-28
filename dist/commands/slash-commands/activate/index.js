"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const createSchedulingModal_1 = require("./createSchedulingModal");
async function activate(interaction) {
    await interaction.showModal((0, createSchedulingModal_1.createSchedulingModal)());
}
exports.activate = activate;
