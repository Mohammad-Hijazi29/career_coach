// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA2mWK_0kKsQ94ag1HUOdWfsqwjWOG5_Ik",
  authDomain: "careercoach-7dbf8.firebaseapp.com",
  projectId: "careercoach-7dbf8",
  storageBucket: "careercoach-7dbf8.firebasestorage.app",
  messagingSenderId: "72869117278",
  appId: "1:72869117278:web:1b63ae4cffd45f9a52e3cf",
  measurementId: "G-VP3ZC09WGE"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);

export const db = getFirestore(app);