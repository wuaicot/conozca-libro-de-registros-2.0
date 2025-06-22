import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

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
  email: string;
  edificio: string;
  cargo: string;
  correoPrueba?: string;
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
    const { email, edificio, cargo, correoPrueba } = req.body as Solicitud;

    // Validación básica
    if (!email || !edificio || !cargo) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    // Guardar en Firestore
    const docRef = await addDoc(collection(db, 'solicitudes'), {
      email,
      edificio,
      cargo,
      correoPrueba: correoPrueba || null,
      timestamp: new Date().toISOString()
    });

    console.log('✅ Documento guardado con ID:', docRef.id);
    
    return res.status(200).json({ message: 'Solicitud recibida con éxito!' });
  } catch (error: any) {
    console.error('❌ Error al guardar en Firestore:', error);
    
    // Mensaje de error más amigable
    const errorMessage = error.code 
      ? `Firebase error (${error.code})` 
      : 'Error interno del servidor';
    
    return res.status(500).json({ message: errorMessage });
  }
}