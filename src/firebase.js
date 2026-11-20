/**
 * src/firebase.js
 * Firebase initialization for Opsynera Intelligence
 *
 * Exports:
 *   app  — Firebase App instance
 *   auth — Firebase Authentication instance
 *   db   — Cloud Firestore instance
 *
 * All config values are read from .env (import.meta.env)
 * No credentials are hardcoded here.
 * Analytics is NOT initialized — not required for this application.
 */

import { initializeApp } from 'firebase/app';
import { getAuth }        from 'firebase/auth';
import { getFirestore }   from 'firebase/firestore';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Authentication — used for secure admin login
export const auth = getAuth(app);

// Initialize Cloud Firestore — used for inquiries, services, industries
export const db = getFirestore(app);

// Export app as default for any future Firebase service initialization
export default app;
