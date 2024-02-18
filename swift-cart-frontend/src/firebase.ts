// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADVdmq-8Qu2Zwk9QcL14pS7Aevmms34zQ",
  authDomain: "swift-cart-v1.firebaseapp.com",
  projectId: "swift-cart-v1",
  storageBucket: "swift-cart-v1.appspot.com",
  messagingSenderId: "277739562088",
  appId: "1:277739562088:web:c48d8680dc3a490158c7dd",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
