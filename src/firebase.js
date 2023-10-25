// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'food-post-client.firebaseapp.com',
  projectId: 'food-post-client',
  storageBucket: 'food-post-client.appspot.com',
  messagingSenderId: '537916888994',
  appId: '1:537916888994:web:e909805910a62ce55744fb',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
