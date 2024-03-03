"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = tslib_1.__importDefault(require("../supabase/index"));
async function findOrCreateByDiscordId(discordGuildId) {
    const data = await findByDiscordId(discordGuildId);
    if (data) {
        return data;
    }
    const { data: newData, error: createError } = await index_1.default.from('campaigns').insert({ discord_guild_id: discordGuildId }).select().single();
    if (createError) {
        throw new Error(createError.message);
    }
    return newData;
}
async function findByDiscordId(discordGuildId) {
    const { data, error } = await index_1.default.from('campaigns').select().eq('discordGuildId', discordGuildId).limit(1).single();
    if (error) {
        throw new Error(error.message);
    }
    return data;
}
exports.default = { findOrCreateByDiscordId };
