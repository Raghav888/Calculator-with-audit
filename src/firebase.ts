import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAx7hFfsrIU5NarN1QA_pHCbhC68P5TbeI",
  authDomain: "calculator-870ca.firebaseapp.com",
  projectId: "calculator-870ca",
  storageBucket: "calculator-870ca.firebasestorage.app",
  messagingSenderId: "42867095208",
  appId: "1:42867095208:web:1d72d5b82fdd4a3205f49d",
  measurementId: "G-YV4VFVZ0MB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;