import { initializeApp } from "firebase/app"
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc,
    query,
    where,
    documentId
} from "firebase/firestore/lite"

const firebaseConfig = {
    apiKey: "AIzaSyD0PwhrB4J8p8y0D1u06mZoSnB4MNDA8lY",
    authDomain: "vanlife-58d1d.firebaseapp.com",
    projectId: "vanlife-58d1d",
    storageBucket: "vanlife-58d1d.appspot.com",
    messagingSenderId: "508604877791",
    appId: "1:508604877791:web:c708583cde0e1981c6926a"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig); // Replace firebaseConfig with your own Firebase configuration

// Get a Firestore reference
const db = firebase.firestore();

// Create van documents
db.collection("van").doc("1").set({
  id: "1",
  name: "Modest Explorer",
  price: 60,
  description: "The Modest Explorer is a van designed to get you out of the house and into nature. This beauty is equipped with solar panels, a composting toilet, a water tank and kitchenette. The idea is that you can pack up your home and escape for a weekend or even longer!",
  imageUrl: "https://assets.scrimba.com/advanced-react/react-router/modest-explorer.png",
  type: "simple",
  hostId: "123"
});

db.collection("van").doc("2").set({
  id: "2",
  name: "Beach Bum",
  price: 80,
  description: "Beach Bum is a van inspired by surfers and travelers. It was created to be a portable home away from home, but with some cool features in it you won't find in an ordinary camper.",
  imageUrl: "https://assets.scrimba.com/advanced-react/react-router/beach-bum.png",
  type: "rugged",
  hostId: "123"
});

db.collection("van").doc("3").set({
  id: "3",
  name: "Reliable Red",
  price: 100,
  description: "Reliable Red is a van that was made for travelling. The inside is comfortable and cozy, with plenty of space to stretch out in. There's a small kitchen, so you can cook if you need to. You'll feel like home as soon as you step out of it.",
  imageUrl: "https://assets.scrimba.com/advanced-react/react-router/reliable-red.png",
  type: "luxury",
  hostId: "456"
});

db.collection("van").doc("4").set({
  id: "4",
  name: "Dreamfinder",
  price: 65,
  description: "Dreamfinder is the perfect van to travel in and experience. With a ceiling height of 2.1m, you can stand up in this van and there is great head room. The floor is a beautiful glass-reinforced plastic (GRP) which is easy to clean and very hard wearing. A large rear window and large side windows make it really light inside and keep it well ventilated.",
  imageUrl: "https://assets.scrimba.com/advanced-react/react-router/dreamfinder.png",
  type: "simple",
  hostId: "789"
});

db.collection("van").doc("5").set({
  id: "5",
  name: "The Cruiser",
  price: 120,
  description: "The Cruiser is a van for those who love to travel in comfort and luxury. With its many windows, spacious interior and ample storage space, the Cruiser offers a beautiful view wherever you go.",
  imageUrl: "https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png",
  type: "luxury",
  hostId: "789"
});

db.collection("van").doc("6").set({
  id: "6",
  name: "Green Wonder",
  price: 70,
  description: "With this van, you can take your travel life to the next level. The Green Wonder is a sustainable vehicle that's perfect for people who are looking for a stylish, eco-friendly mode of transport that can go anywhere.",
  imageUrl: "https://assets.scrimba.com/advanced-react/react-router/green-wonder.png",
  type: "rugged",
  hostId: "123"
});

// Create a user document
db.collection("user").doc("123").set({
  id: "123",
  email: "b@b.com",
  password: "p123",
  name: "Bob"
});


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Refactoring the fetching functions below
const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}