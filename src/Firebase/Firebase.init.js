// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBx3FlWPvW0xKbOV-WAMX9m83nJkMxZHQU",
  authDomain: "mealmate-93072.firebaseapp.com",
  projectId: "mealmate-93072",
  storageBucket: "mealmate-93072.firebasestorage.app",
  messagingSenderId: "1017286017239",
  appId: "1:1017286017239:web:072d1c971a2552876ff092"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();