"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = exports.app = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const firebaseConfig = {
    apiKey: 'AIzaSyDO8X7xXaMb7Im34sBhd-io7R1jzygINIA',
    authDomain: 'bladesinthedarkscord.firebaseapp.com',
    projectId: 'bladesinthedarkscord',
    storageBucket: 'bladesinthedarkscord.appspot.com',
    messagingSenderId: '619775083218',
    appId: '1:619775083218:web:aee122b640ba0bb47c630b',
    measurementId: 'G-HVEMFN32WY'
};
const app = (0, app_1.initializeApp)(firebaseConfig);
exports.app = app;
const store = (0, firestore_1.getFirestore)(app);
exports.store = store;
