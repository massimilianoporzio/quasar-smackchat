import {firebaseAuth, firebaseDb} from "boot/firebase";
import {signInWithEmailAndPassword,createUserWithEmailAndPassword } from "firebase/auth";
import {ref,set} from 'firebase/database'

export function registerUser ({},payload) {
    console.log('payload is ',payload)
    createUserWithEmailAndPassword(firebaseAuth,payload.email,payload.password)
       .then(response=>{
         let userId = firebaseAuth.currentUser.uid
         set(ref(firebaseDb,'users/'+userId),{
           name: payload.name,
           email: payload.email,
           online: true
         });
        console.log(response)
      }).catch(error=>{
        console.log(error.message)
    })
}

export function loginUser({},payload){
  signInWithEmailAndPassword(firebaseAuth, payload.email, payload.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      console.log("LOGGED IN THE USER: ", user)
    })
    .catch((error) => {
      console.log(error.message)
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}
