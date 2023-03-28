"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGameRole = void 0;
async function createGameRole({ guild, name }) {
    return guild.roles.create({
        name,
        mentionable: true
    });
}
exports.createGameRole = createGameRole;
