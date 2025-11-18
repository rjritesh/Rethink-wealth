import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6riyPswwEsel65VHzkrVqLJbimQu2n1E",
  authDomain: "rethinkwealth-459b4.firebaseapp.com",
  projectId: "rethinkwealth-459b4",
  storageBucket: "rethinkwealth-459b4.firebasestorage.app",
  messagingSenderId: "799502729977",
  appId: "1:799502729977:web:55cfc31a95c7dc359e9828",
  measurementId: "G-NB03ZR1GCD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function logout() {
  await signOut(auth)
  await fetch('/api/logout', { method: 'POST' })
}

export { auth, db, logout };
