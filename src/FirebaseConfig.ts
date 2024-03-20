import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASJQfOkOME-ObQ9fgbkFLZuxNBprLbtqU",
  authDomain: "imagereaderai.firebaseapp.com",
  projectId: "imagereaderai",
  storageBucket: "imagereaderai.appspot.com",
  messagingSenderId: "73135222636",
  appId: "1:73135222636:web:9daeff6f1e985a37020d49",
  measurementId: "G-544955HFKR"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);