import { collection, addDoc, getDocs, query, where, updateDoc } from 'firebase/firestore';
import ServerService from './ServerService.js';
async function saveClock({ discordGuildId, ...restOptions }) {
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
    const clocks = querySnapshot.docs.map((doc) => doc.data()) || [];
    return clocks;
}
async function updateClock({ discordGuildId, ...restOptions }) {
    const clocksRef = collection((await ServerService.findOrSaveServer(discordGuildId)).ref, 'clocks');
    const q = query(clocksRef, where('name', '==', restOptions.name));
    const querySnapshot = await getDocs(q);
    const clockRef = querySnapshot.docs[0].ref;
    await updateDoc(clockRef, restOptions);
}
export default {
    updateClock,
    saveClock,
    getClocks
};
