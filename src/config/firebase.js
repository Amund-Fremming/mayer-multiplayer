import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBguqju4b-K8s1CQLmhtMyELP2JBu0ibC0",
  authDomain: "mayer-41a13.firebaseapp.com",
  projectId: "mayer-41a13",
  storageBucket: "mayer-41a13.appspot.com",
  messagingSenderId: "942746629057",
  appId: "1:942746629057:web:9162c49b535721b71cf540",
  measurementId: "G-5YDTFXQ3CQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize database
export const db = getFirestore(app);
