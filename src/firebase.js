import firebase, { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAxQPaqCU6uIoIbJEKtOZD2dwW9ctafB2A",
    authDomain: "clone-b7411.firebaseapp.com",
    projectId: "clone-b7411",
    storageBucket: "clone-b7411.appspot.com",
    messagingSenderId: "95171906062",
    appId: "1:95171906062:web:ae246399ac6e6c494b8a5f",
    measurementId: "G-8G6EH6XR35",
    databaseURL: "https://clone-b7411-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
//const analytics = getAnalytics(firebaseApp);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth, database };
