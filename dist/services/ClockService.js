"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("../firebase");
async function saveClock(options) {
    try {
        const docRef = await (0, firestore_1.addDoc)((0, firestore_1.collection)(firebase_1.store, 'clocks'), {
            ...options,
            progress: 0
        });
        console.log('Document written with ID: ', docRef.id);
    }
    catch (e) {
        console.error('Error adding document: ', e);
    }
}
async function getClocks() {
    const querySnapshot = await (0, firestore_1.getDocs)((0, firestore_1.collection)(firebase_1.store, 'clocks'));
    const clocks = querySnapshot.docs.map((doc) => doc.data());
    return clocks;
}
exports.default = {
    saveClock,
    getClocks
};
