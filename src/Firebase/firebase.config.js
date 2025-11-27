// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
 apiKey: "AIzaSyAXiKAYzr2ntDV7zzKHzTIIt-p8LVGZ9tU",
  authDomain: "first-next-auth-90569.firebaseapp.com",
  projectId: "first-next-auth-90569",
  storageBucket: "first-next-auth-90569.firebasestorage.app",
  messagingSenderId: "768167303998",
  appId: "1:768167303998:web:7835b2fb2c4a94af19ea6f"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);