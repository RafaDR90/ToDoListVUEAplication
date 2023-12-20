import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
// ... other firebase imports

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyBPP8VVct93JhEXYf_Vmk_387Oc3MH6WFI",
    authDomain: "tiendavue-691bc.firebaseapp.com",
    projectId: "tiendavue-691bc",
    storageBucket: "tiendavue-691bc.appspot.com",
    messagingSenderId: "868136588427",
    appId: "1:868136588427:web:ad9f46873c73b385c3308e"
})

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const todosRef = collection(db, 'todos')