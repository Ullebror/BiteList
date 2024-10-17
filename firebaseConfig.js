import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.local.firebaseKey,
  authDomain: `${process.env.local.projectId}.firebaseapp.com`,
  projectId: process.env.local.projectId,
  storageBucket: `${process.env.local.projectId}.appspot.com`,
  messagingSenderId: messageId,
  appId: process.env.local.appId,
  measurementId: process.env.local.measurementId,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//Initialize Firebase Authentication and export it for use
export const auth = getAuth(app);
