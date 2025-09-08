import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect,
  setPersistence,
  browserLocalPersistence,
  Auth,
  onAuthStateChanged,
  browserSessionPersistence,
} from "firebase/auth";

const envValues = import.meta.env;

const firebaseConfig = {
  apiKey: envValues.VITE_FIREBASE_API_KEY,
  authDomain: envValues.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: envValues.VITE_FIREBASE_PROJECT_ID,
  storageBucket: envValues.VITE_FIREBASE_STORE_BUCKET,
  messagingSenderId: envValues.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: envValues.VITE_FIREBASE_APP_ID,
  measurementId: envValues.VITE_FIREBASE_MENSUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
export const googleProviderLocal = new GoogleAuthProvider();

export const getAuthLocal = async (): Promise<Auth> => {
  const auth = getAuth(app);

  try {
    await setPersistence(auth, browserLocalPersistence);
  } catch (error) {
    console.warn("browserLocalPersistence falhou, caindo para session:", error);
    await setPersistence(auth, browserSessionPersistence);
  }

  return auth;
};

export const signInWithPopupLocal = signInWithPopup;
export const signInWithRedirectLocal = signInWithRedirect;
export const getRedirectResultLocal = getRedirectResult;
export const onAuthStateChangedLocal = onAuthStateChanged;
