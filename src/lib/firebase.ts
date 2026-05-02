import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACDK9RuWMnWovCHCtFIKKvd5Ygu-n4zzw",
  authDomain: "medy-ping.firebaseapp.com",
  projectId: "medy-ping",
  storageBucket: "medy-ping.firebasestorage.app",
  messagingSenderId: "919339678431",
  appId: "1:919339678431:web:335a67e5af2fe9ac63076a",
  measurementId: "G-236F583EBS"
};

// Initialize Firebase (prevent multiple initializations in dev)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
