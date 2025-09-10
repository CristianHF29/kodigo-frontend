// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD3CmJFetaYdwQ-qJAyKAeR4wQPRHeXChE",
    authDomain: "kodigo-bootcamps.firebaseapp.com",
    projectId: "kodigo-bootcamps",
    storageBucket: "kodigo-bootcamps.firebasestorage.app",
    messagingSenderId: "197439867369",
    appId: "1:197439867369:web:47c38ac6fb2a8f3c952378"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);