import { getFirestore } from 'firebase/firestore'
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOP24N5TuuXvjy5DtSwK_7g9zK6g5bT1Y",
  authDomain: "greydive-challenge-b5362.firebaseapp.com",
  projectId: "greydive-challenge-b5362",
  storageBucket: "greydive-challenge-b5362.appspot.com",
  messagingSenderId: "796531539234",
  appId: "1:796531539234:web:26552dbbd0ded9632e797b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;