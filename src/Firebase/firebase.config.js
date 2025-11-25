// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId
};

//  AIzaSyAXiKAYzr2ntDV7zzKHzTIIt-p8LVGZ9tU
//  first-next-auth-90569.firebaseapp.com
//  first-next-auth-90569
//  first-next-auth-90569.firebasestorage.app
//  768167303998
//  1:768167303998:web:5c9779337152af1f19ea6f

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);