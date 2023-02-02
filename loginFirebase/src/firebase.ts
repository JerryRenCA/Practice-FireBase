// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log(import.meta.env.VITE_REACT_APP_FIREBASE_KEY)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_KEY,
  authDomain: "react-login-1-d9adc.firebaseapp.com",
  projectId: "react-login-1-d9adc",
  storageBucket: "react-login-1-d9adc.appspot.com",
  messagingSenderId: "674228450859",
  appId: "1:674228450859:web:5cf26073586822a5e79c6e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth()
export const db = getFirestore(app);

