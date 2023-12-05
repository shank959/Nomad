// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDz128knTCEqgtoHFLLqFjvsUB_04Omkb0",
  authDomain: "nomad-bb690.firebaseapp.com",
  projectId: "nomad-bb690",
  storageBucket: "nomad-bb690.appspot.com",
  messagingSenderId: "240536710833",
  appId: "1:240536710833:web:433e3eec97a941d4cbfc90"
};


// Initialize Firebase
// Check if Firebase has already been initialized to avoid duplicates
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export default app;