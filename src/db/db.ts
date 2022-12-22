import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAxxsOvPnBVzOJXwoDN0JszRrLE85pXWrE",
    authDomain: "hotswap-e40ea.firebaseapp.com",
    projectId: "hotswap-e40ea",
    storageBucket: "hotswap-e40ea.appspot.com",
    messagingSenderId: "746649595119",
    appId: "1:746649595119:web:8fb184cc1d289e9b017f1a",
    measurementId: "G-ZZZH8SDTRB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)


export { db }
