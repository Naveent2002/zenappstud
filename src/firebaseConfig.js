import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Import getAuth for authentication

const firebaseConfig = {
    apiKey: "AIzaSyDC9XHAQEJIEyiA4xgZdY4na6OXflO5fnI",
    authDomain: "zenappstudio-8780a.firebaseapp.com",
    projectId: "zenappstudio-8780a",
    storageBucket: "zenappstudio-8780a.appspot.com",
    messagingSenderId: "30701082359",
    appId: "1:30701082359:web:a1c4a83a45d57226aaa5f2",
    measurementId: "G-LRN8KZ0HHZ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const firestore = getFirestore(app);
const auth = getAuth(app); // Initialize Firebase Authentication

export { firestore, auth }; // Export both firestore and auth
