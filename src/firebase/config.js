// firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";   // 👈 use Firestore
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC7x4wmerYs0cBtceOm_bFgGF4SJHaqDLY",
  authDomain: "quest26-d63b4.firebaseapp.com",
  projectId: "quest26-d63b4",
  storageBucket: "quest26-d63b4.firebasestorage.app",
  messagingSenderId: "1076820423907",
  appId: "1:1076820423907:web:c358abb44592c957af81d6",
  measurementId: "G-JFYH79JKWV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);    // 👈 Firestore instance
export const storage = getStorage(app);

export default app;
