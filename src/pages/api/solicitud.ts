import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc, FirestoreError } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Inicializar Firebase solo una vez
let db: ReturnType<typeof getFirestore>;

if (!getApps().length) {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} else {
  db = getFirestore();
}

interface Solicitud {
  name: string;
  edificio: string;
  ciudad: string;
  cargo: string;
  comentario: string;
  correoPrueba?: string | null;
  timestamp: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    const { name, edificio, ciudad, cargo, comentario, correoPrueba } = req.body as Solicitud;

    // Validación básica actualizada
    if (!name || !edificio || !ciudad || !cargo) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    // Guardar en Firestore con los nuevos campos
    const docRef = await addDoc(collection(db, 'solicitudes'), {
      name,
      edificio,
      ciudad,
      cargo,
      comentario: comentario || "",
      correoPrueba: correoPrueba || null,
      timestamp: new Date().toISOString()
    });

    console.log('✅ Documento guardado con ID:', docRef.id);
    
    return res.status(200).json({ message: 'Solicitud recibida con éxito!' });
  } catch (error) {
    console.error('❌ Error al guardar en Firestore:', error);
    
    let errorMessage = 'Error interno del servidor';
    
    // Manejar errores de Firebase específicos
    if (error instanceof Error) {
      if ('code' in error) {
        const firestoreError = error as FirestoreError;
        errorMessage = `Firebase error (${firestoreError.code})`;
      } else {
        errorMessage = error.message;
      }
    }
    
    return res.status(500).json({ message: errorMessage });
  }
}