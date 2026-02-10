import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";

// Configuración de tu proyecto
const firebaseConfig = {
  apiKey: "AIzaSyA0i9N5nTatNI7QUSX1x8Oj9TZFBpcsjGQ",
  authDomain: "mardelplataoficios.firebaseapp.com",
  projectId: "mardelplataoficios",
  storageBucket: "mardelplataoficios.firebasestorage.app",
  messagingSenderId: "467689142180",
  appId: "1:467689142180:web:9d48f43b71b35b7c247331",
  measurementId: "G-K1J09TWGZH"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testFirestore() {
  const docRef = doc(db, "pruebaTemporal", "docTemporal");

  // Crear documento
  await setDoc(docRef, { mensaje: "Prueba temporal" });
  console.log("Documento creado correctamente");

  // Leer documento
  const snapshot = await getDoc(docRef);
  console.log("Documento leído:", snapshot.data());

  // Eliminar documento
  await deleteDoc(docRef);
  console.log("Documento eliminado correctamente");
}

testFirestore().catch(console.error);
