// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCWJp1vqs-vTjOFrV3MIIcH0f0wCoCTh_U',
  authDomain: 'artika-browser.firebaseapp.com',
  projectId: 'artika-browser',
  storageBucket: 'artika-browser.firebasestorage.app',
  messagingSenderId: '816893360178',
  appId: '1:816893360178:web:dddbf5ba027e9672c1a42b',
  measurementId: 'G-DNNFY2KXB5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const analytics =
  typeof window !== 'undefined' ? getAnalytics(app) : null;
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
