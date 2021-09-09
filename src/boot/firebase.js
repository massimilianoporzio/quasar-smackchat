// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database"; // database is real-time database non il firestore solito


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUdj0BT-GrXe3UIkdJUG2KEK-jvESts2s",
  authDomain: "smackchat-c52ff.firebaseapp.com",
  projectId: "smackchat-c52ff",
  storageBucket: "smackchat-c52ff.appspot.com",
  messagingSenderId: "788572345942",
  appId: "1:788572345942:web:a031f60be7f2cac320cdf7"
};

// Initialize Firebase
let firebaseApp = initializeApp(firebaseConfig);

// API PER AUTH
let firebaseAuth = firebaseApp.auth

//API per db
let firebaseDb = firebaseApp.database

export {firebaseAuth, firebaseDb}
