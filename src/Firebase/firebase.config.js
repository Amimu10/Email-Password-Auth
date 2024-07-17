
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHzD-UaAUlGj7VKM2gwqAKO3pNmJ8Djnc",
  authDomain: "email-password-auth-b3e9e.firebaseapp.com",
  projectId: "email-password-auth-b3e9e",
  storageBucket: "email-password-auth-b3e9e.appspot.com",
  messagingSenderId: "724556305815",
  appId: "1:724556305815:web:f8dad4be12ecec839c60d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth; 