// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";  // Import Firestore functions

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3rGQ8kcVZ7toq_ph5n-6Qae-MzTo68BE",
  authDomain: "mental-health-check-in-f3c38.firebaseapp.com",
  projectId: "mental-health-check-in-f3c38",
  storageBucket: "mental-health-check-in-f3c38.appspot.com",
  messagingSenderId: "69871225866",
  appId: "1:69871225866:web:08b2c0a95942169adfe3f3",
  measurementId: "G-4RBXMWVY7Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

// Export the Firestore database
export { db };
