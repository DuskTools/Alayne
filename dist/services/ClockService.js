"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const supabase_1 = tslib_1.__importDefault(require("../supabase"));
async function create(clockParams) {
    const { data, error } = await supabase_1.default
        .from('clocks')
        .insert(clockParams)
        .select()
        .single();
    if (error) {
        throw new Error(error.message);
    }
    return data;
}
async function getActiveClocks(campaign_id) {
    const { data, error } = await supabase_1.default
        .from('clocks')
        .select()
        .eq('campaign_id', campaign_id)
        .eq('active', true);
    if (error) {
        throw new Error(error.message);
    }
    return data;
}
async function getClock({ campaign_id, name }) {
    const { data, error } = await supabase_1.default
        .from('clocks')
        .select()
        .eq('campaign_id', campaign_id)
        .eq('name', name)
        .limit(1)
        .single();
    if (error) {
        throw new Error(error.message);
    }
    return data;
}
async function updateClock(options) {
    const { data, error } = await supabase_1.default
        .from('clocks')
        .update(options)
        .eq('campaign_id', options.campaign_id)
        .eq('name', options.name)
        .select()
        .single();
    if (error) {
        throw new Error(error.message);
    }
    return data;
}
exports.default = {
    updateClock,
    getClock,
    create,
    getActiveClocks
};
