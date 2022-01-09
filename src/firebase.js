// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.BOKBOK_APP_API_KEY,
  authDomain: process.env.BOKBOK_APP_AUTH_DOMAIN,
  databaseURL: process.env.BOKBOK_APP_DATABASE_URL,
  projectId: process.env.BOKBOK_APP_PROJECT_ID,
  storageBucket: process.env.BOKBOK_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.BOKBOK_APP_MESSAGING_SENDER_ID,
  appId: process.env.BOKBOK_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
