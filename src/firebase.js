// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQqMbfGJULRYbz75Czr-10my9AoBj5P_s",
  authDomain: "animal-welfare-tracker.firebaseapp.com",
  projectId: "animal-welfare-tracker",
  storageBucket: "animal-welfare-tracker.appspot.com",
  messagingSenderId: "899385075966",
  appId: "1:899385075966:web:6c83c5f2e02ba0ff6a5daf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);