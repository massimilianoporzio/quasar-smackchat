import {firebaseAuth, firebaseDb} from "boot/firebase";

export function registerUser ({},payload) {
    console.log('payload is ',payload)
    firebaseAuth.createUserWithEmailAndPassword(payload.email,payload.password)
}
