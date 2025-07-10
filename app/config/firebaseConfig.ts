// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhRtYSeoKMBSqTuiLtK8h1d9B7YE_acB8",
  authDomain: "kitglobaltest.firebaseapp.com",
  projectId: "kitglobaltest",
  storageBucket: "kitglobaltest.firebasestorage.app",
  messagingSenderId: "160243862156",
  appId: "1:160243862156:web:8ca038a0ca45f6921989a9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
