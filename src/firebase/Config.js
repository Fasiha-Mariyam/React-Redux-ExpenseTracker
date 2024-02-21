import { initializeApp } from "firebase/app";
import { getAuth  } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC-9fEAl1_lSUC4HosCseGsG-vRAS-LuNk",
  authDomain: "reactexpensetracker-573eb.firebaseapp.com",
  projectId: "reactexpensetracker-573eb",
  storageBucket: "reactexpensetracker-573eb.appspot.com",
  messagingSenderId: "1087977425244",
  appId: "1:1087977425244:web:6f57f6f305db5586055999"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore()