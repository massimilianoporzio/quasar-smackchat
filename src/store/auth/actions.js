import {firebaseAuth, firebaseDb} from "boot/firebase";
import {signInWithEmailAndPassword,createUserWithEmailAndPassword,onAuthStateChanged, signOut } from "firebase/auth";
import {ref,set, get, child,onValue ,update} from 'firebase/database'

import {setUserDetails} from "src/store/auth/mutations";


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
export function logoutUser(){
  console.log('Logging out the user')
  signOut(firebaseAuth)
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

export function handleAuthStateChange({commit, dispatch,state}) {

  onAuthStateChanged(firebaseAuth,(user)=>{
    commit('setLoading',true)
    if (user){
      // user is logged in
      const dbRef = ref(firebaseDb);
      onValue(child(dbRef, `users/${user.uid}`),(snapshot)=>{
        let userDetails = snapshot.val()

        commit('setUserDetails',{
          name: userDetails.name,
          email: userDetails.email,
          userId: user.uid
        })
        commit('setLoading',false)
      })
      // update user details on the state
      dispatch('firebaseUpdateUser',{
        userId: user.uid,
        updates: {
          online: true
        }
      })
      this.$router.push('/')

    }
    else
    {
      //user is logged out
      //PRENDO DALLO STATE LO USER ID prima di resettare lo state
      let userId = state.userDetails.userId


      dispatch('firebaseUpdateUser',{
        userId: userId,
        updates: {
          online: false
        }
      })
      commit('setUserDetails',{})
      this.$router.replace('/auth')
    }
  })
}

export function firebaseUpdateUser({},payload) {
  update(ref(firebaseDb,'users/'+payload.userId),payload.updates)
}


