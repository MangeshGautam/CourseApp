// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyC6g7ZUJYFvtXqt1j9QYa555lXRdGmrA7I",
  authDomain: "learning-5dd15.firebaseapp.com",
  projectId: "learning-5dd15",
  storageBucket: "learning-5dd15.firebasestorage.app",
  messagingSenderId: "448763943420",
  appId: "1:448763943420:web:a15dd81afbcfcba31e3a79",
  measurementId: "G-CPLBWF8FGN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);   