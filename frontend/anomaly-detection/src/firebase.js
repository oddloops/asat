import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth"

// Firebase Authentication
const firebaseConfig = {
  apiKey: "AIzaSyCpniV7KUSZU359S1SbIjY5fReUdEiXARQ",
  authDomain: "asat-24070.firebaseapp.com",
  projectId: "asat-24070",
  storageBucket: "asat-24070.appspot.com",
  messagingSenderId: "142363225203",
  appId: "1:142363225203:web:d199f7b39a1de945f7ce06",
  measurementId: "G-7TG2VX627F"
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  // appId: process.env.REACT_APP_FIREBASE_APPID,
  // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export {auth}