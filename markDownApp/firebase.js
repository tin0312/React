
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDDKoAzrORV8NrdfRSiC7iD0xOWV4vsgUU",
    authDomain: "react-notes-9297f.firebaseapp.com",
    projectId: "react-notes-9297f",
    storageBucket: "react-notes-9297f.appspot.com",
    messagingSenderId: "155767824670",
    appId: "1:155767824670:web:6a410e35274f307ce4290f"
  };
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const notesCollection = collection(db, "notes") 
 