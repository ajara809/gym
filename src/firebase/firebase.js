// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-qTBIIkq3TyYGxrm3lSOS0JosQxUhrQ0",
  authDomain: "sample-98b77.firebaseapp.com",
  projectId: "sample-98b77",
  storageBucket: "sample-98b77.firebasestorage.app",
  messagingSenderId: "490512913616",
  appId: "1:490512913616:web:69c599cbcb1e4f105c3ad5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

