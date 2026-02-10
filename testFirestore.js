import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";

// Configuración de tu proyecto
const firebaseConfig = {
  apiKey: "AIzaSyCJjo5iam7VHLGzto6I7urAMYEOU5gcAkE",
  authDomain: "mardelplataoficios.firebaseapp.com",
  projectId: "mardelplataoficios",
  storageBucket: "mardelplataoficios.firebasestorage.app",
  messagingSenderId: "467689142180",
  appId: "1:467689142180:web:c053badf4a91f412247331"
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
