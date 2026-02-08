
// src/lib/firebase.ts
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getFunctions, Functions } from 'firebase/functions';
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0i9N5nTatNI7QUSX1x8Oj9TZFBpcsjGQ",
  authDomain: "mardelplataoficios.firebaseapp.com",
  projectId: "mardelplataoficios",
  storageBucket: "mardelplataoficios.appspot.com",
  messagingSenderId: "467689142180",
  appId: "1:467689142180:web:9d48f43b71b35b7c247331",
  measurementId: "G-K1J09TWGZH"
};


let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  if (typeof window !== 'undefined') {
    isSupported().then((supported) => {
      if (supported) {
        getAnalytics(app);
      }
    });
  }
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
