import {initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "management-a48ce.firebaseapp.com",
    projectId: "management-a48ce",
    storageBucket: "management-a48ce.appspot.com",
    messagingSenderId: "578970016817",
    appId: process.env.REACT_APP_API_ID
  };
const app=initializeApp(firebaseConfig)
const db=getFirestore(app)
export { db };
export const auth = getAuth();