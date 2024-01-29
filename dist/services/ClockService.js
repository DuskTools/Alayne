import { collection, addDoc, getDocs, query, where, updateDoc } from 'firebase/firestore';
import ServerService from './ServerService.js';
async function create({ discordGuildId, ...restOptions }) {
    await addDoc(collection((await ServerService.findOrSaveServer(discordGuildId)).ref, 'clocks'), {
        ...restOptions,
        discordGuildId,
        progress: 0
    });
}
async function getClocks(discordGuildId) {
    const clocksRef = collection((await ServerService.findOrSaveServer(discordGuildId)).ref, 'clocks');
    const q = query(clocksRef, where('active', '==', true));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs;
}
async function getClock({ discordGuildId, name }) {
    const clocksRef = collection((await ServerService.findOrSaveServer(discordGuildId)).ref, 'clocks');
    const q = query(clocksRef, where('name', '==', name));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0];
}
async function updateClock({ discordGuildId, ...restOptions }) {
    const clockRef = (await getClock({ discordGuildId, ...restOptions })).ref;
    await updateDoc(clockRef, restOptions);
}
export default {
    updateClock,
    getClock,
    create,
    getClocks
};
