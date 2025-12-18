
// src/lib/firebase.ts
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getFunctions, Functions } from 'firebase/functions';

// Esta es la configuración de tu NUEVO y único proyecto de Firebase.
const firebaseConfig = {
  apiKey: "AIzaSyA43q5nZJq-g_btpQhsmEw3i7s52Gjl1lQ",
  authDomain: "studio-4820039016-83344.firebaseapp.com",
  // ------------------------------------------------------------------
  // ¡ESTE ES EL ID DE TU NUEVO PROYECTO! 
  // Búscalo en console.firebase.google.com para acceder a su consola.
  // ------------------------------------------------------------------
  projectId: "studio-4820039016-83344",
  storageBucket: "studio-4820039016-83344.appspot.com",
  messagingSenderId: "54230232537",
  appId: "1:54230232537:web:c02d8479e95195ed8422aa"
};

let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);
const functions: Functions = getFunctions(app);

export { app, auth, db, storage, functions };

// Legacy getters for any components that might still use them.
export const getFirebaseAuth = () => auth;
export const getFirestoreDb = () => db;
export const getFirebaseStorage = () => storage;
