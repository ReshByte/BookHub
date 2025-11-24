// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD85IDAM7zNIOfAnEyNXH5Lml11R5Qs7pc",
  authDomain: "bookhub-f26c2.firebaseapp.com",
  projectId: "bookhub-f26c2",
  storageBucket: "bookhub-f26c2.firebasestorage.app",
  messagingSenderId: "337893971774",
  appId: "1:337893971774:web:4203843f537b9eeeaf7e6f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);