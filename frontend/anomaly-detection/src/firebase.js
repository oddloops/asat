import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth"

// Firebase Authentication
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_BASE,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_APPID,
  measurementId: process.env.FIREBASE_MEASUREMENTID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export {auth}