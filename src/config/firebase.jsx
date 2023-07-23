import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';




const firebaseConfig = {
  apiKey: "AIzaSyCQiEW9evZ6a9TzmLxReWWufAyN_nOV4T8",
  authDomain: "movieflix-cecb3.firebaseapp.com",
  projectId: "movieflix-cecb3",
  storageBucket: "movieflix-cecb3.appspot.com",
  messagingSenderId: "129901827750",
  appId: "1:129901827750:web:180791685a0e298f618667",
  measurementId: "G-K4RVXKQ5GN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
