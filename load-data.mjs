// load-data.mjs
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, writeBatch } from 'firebase/firestore';

// CONFIGURACIÓN DE FIREBASE NUEVA
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

// DATOS DE BANNERS ADAPTADOS AL NUEVO BUCKET
const AD_BANNERS_DATA = [
  {
    id: 1,
    imageUrl: 'https://storage.googleapis.com/mardelplataoficios.appspot.com/adBanners/ad1.jpg',
    alt: 'Publicidad de herramientas',
    imageHint: 'construction tools',
    storagePath: 'adBanners/ad1.jpg'
  },
  {
    id: 2,
    imageUrl: 'https://storage.googleapis.com/mardelplataoficios.appspot.com/adBanners/ad2.jpg',
    alt: 'Publicidad de materiales de construcción',
    imageHint: 'building materials',
    storagePath: 'adBanners/ad2.jpg'
  },
  {
    id: 3,
    imageUrl: 'https://storage.googleapis.com/mardelplataoficios.appspot.com/adBanners/ad3.jpg',
    alt: 'Publicidad de productos de limpieza',
    imageHint: 'cleaning supplies',
    storagePath: 'adBanners/ad3.jpg'
  },
];

async function clearCollection(collectionName) {
  const collectionRef = collection(db, collectionName);
  const querySnapshot = await getDocs(collectionRef);
  if (querySnapshot.empty) {
    console.log(`La colección ${collectionName} ya está vacía.`);
    return;
  }
  const batch = writeBatch(db);
  querySnapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();
  console.log(`Colección ${collectionName} limpiada.`);
}

async function uploadData() {
  try {
    console.log('Iniciando carga de datos...');

    // Limpiar la colección antes de cargar nuevos datos
    await clearCollection('adBanners');

    const bannersCollection = collection(db, 'adBanners');
    for (const banner of AD_BANNERS_DATA) {
      // Guardamos el id como campo para no perderlo (sistema antiguo)
      await addDoc(bannersCollection, banner);
      console.log(`Banner "${banner.alt}" cargado.`);
    }

    console.log('¡Carga de datos completada exitosamente!');
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  } finally {
    process.exit(0);
  }
}

uploadData();
