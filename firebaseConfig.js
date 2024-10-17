import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.firebaseKey,
  authDomain: "shoppingapp-91ahe.firebaseapp.com",
  databaseURL: "https://shoppingapp-91-rtdb.us-west1.firebasedatabase.app",
  projectId: "shoppingapp-91ede",
  storageBucket: "shoppingapp-91ede.appspot.com",
  messagingSenderId: "1056464134052",
  appId: "1:10864638354052:web:e959565f804cacd0ed691",
};

// Add export keyword here
export const app = initializeApp(firebaseConfig);
