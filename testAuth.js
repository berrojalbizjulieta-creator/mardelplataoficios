// testAuth.js
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Configuración de tu clon
const firebaseConfig = {
  apiKey: "AIzaSyCJjo5iam7VHLGzto6I7urAMYEOU5gcAkE",
  authDomain: "mardelplataoficios.firebaseapp.com",
  projectId: "mardelplataoficios",
  storageBucket: "mardelplataoficios.firebasestorage.app",
  messagingSenderId: "467689142180",
  appId: "1:467689142180:web:c053badf4a91f412247331"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Credenciales de prueba (las que diste)
const testEmail = "PABLOGIMENEZ@GMAIL.COM";
const testPassword = "CONTRASELA123456";

async function testFirestore() {
  try {
    // Loguearse
    const userCredential = await signInWithEmailAndPassword(auth, testEmail, testPassword);
    console.log("Usuario logueado:", userCredential.user.uid);

    const docRef = doc(db, "pruebaTemporal", "docTemporal");

    // Crear documento temporal
    await setDoc(docRef, { mensaje: "Prueba temporal" });
    console.log("Documento creado correctamente");

    // Leer documento
    const snapshot = await getDoc(docRef);
    console.log("Documento leído:", snapshot.data());

    // Eliminar documento
    await deleteDoc(docRef);
    console.log("Documento eliminado correctamente");
  } catch (error) {
    console.error("Error:", error);
  }
}

testFirestore();

