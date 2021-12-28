import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

const app = firebase.initializeApp({
    apiKey: "AIzaSyB-jfgzvTwKv9zY8F6R29PQ0XlFTW1eG60",
    authDomain: "naijaauctioneer.firebaseapp.com",
    projectId: "naijaauctioneer",
    storageBucket: "naijaauctioneer.appspot.com",
    messagingSenderId: "260960484906",
    appId: "1:260960484906:web:6f249a1b2283bc4fdf8d53"
})

 export const timestamps = firebase.firestore.FieldValue.serverTimestamp;
 export const firestoreApp = app.firestore()
 export const storageApp = app.storage()
 export const authApp = app.auth()