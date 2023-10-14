import {initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDBeTV0WHlTS-vVry-Quso_G_9V1oQU-Pk",
    authDomain: "management-a48ce.firebaseapp.com",
    projectId: "management-a48ce",
    storageBucket: "management-a48ce.appspot.com",
    messagingSenderId: "578970016817",
    appId: "1:578970016817:web:cff0e370ec095bcd8c0910"
  };
const app=initializeApp(firebaseConfig)
const db=getFirestore(app)
export { db };
export const auth = getAuth();