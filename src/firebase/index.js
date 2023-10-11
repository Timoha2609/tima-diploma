// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyC0Lxu9uQZkRovxhw5MLRuGXGgkiN7xDu8",
    authDomain: "diplomatima-2ecca.firebaseapp.com",
    projectId: "diplomatima-2ecca",
    storageBucket: "diplomatima-2ecca.appspot.com",
    messagingSenderId: "416229570140",
    appId: "1:416229570140:web:29c2571779671f0ffc1899"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }