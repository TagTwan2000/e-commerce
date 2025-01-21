import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { initializeAuth } from "firebase/auth";

// Your Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCl6Aai_ZXeenhYdE4F1YknRwySckrhiwQ",
  authDomain: "ultimatestore-ec085.firebaseapp.com",
  projectId: "ultimatestore-ec085",
  storageBucket: "ultimatestore-ec085.appspot.com",
  messagingSenderId: "483905483923",
  appId: "1:483905483923:web:1d62071c1b72b716a74966",
  measurementId: "G-JCHKW0DCVC",
  databaseURL:"https://ultimatestore-ec085-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app); // Removed AsyncStorage

// Ensure you're exporting the auth object
export { app, getDatabase, auth };
