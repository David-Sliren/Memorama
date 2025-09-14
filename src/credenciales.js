// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKP5envV71a27VJd4iitU_YOsUsPPhv1I",
  authDomain: "proyecto-2-60b22.firebaseapp.com",
  projectId: "proyecto-2-60b22",
  storageBucket: "proyecto-2-60b22.firebasestorage.app",
  messagingSenderId: "180812238344",
  appId: "1:180812238344:web:01a2c1e0b2d2f69ea54bbd"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;