import {firebaseAuth, firebaseDb} from "boot/firebase";
import {signInWithEmailAndPassword,createUserWithEmailAndPassword,onAuthStateChanged, signOut } from "firebase/auth";
import {ref,set, push,get, off, child,onValue ,update,onChildAdded, onChildChanged} from 'firebase/database'

import {setUserDetails} from "src/store/auth/mutations";

let messagesRef

export function firebaseGetMessage({commit, state, rootState},otherUserId) {
    commit('setIsLoadingChat',true)

    let userId = rootState.auth.userDetails.userId
    messagesRef = ref(firebaseDb,'chats/'+userId+'/'+otherUserId)
    onChildAdded(messagesRef, snapshot=>{
        let messageDetails = snapshot.val()
        let messageId = snapshot.key
        commit('addMessage',{
            messageId,messageDetails
        })

    }
    )

    setTimeout(() => {
        commit('setIsLoadingChat',false)
        console.log('isChatLoading: ',state.isChatLoading)
    }, 1000)
    console.log('isChatLoading: ',state.isChatLoading)

}

export function firebaseStopGettingMessages({commit}){
    // console.log('firebaseStopGettingMessages')
    if(messagesRef){
        off(messagesRef, 'child_added')
        commit('clearMessages')
    }

}

export function firebaseSendMessage( {commit, state, rootState},payload){
    console.log("SEND MESSAGE PAYLOAD: ",payload)
    //scrivo messaggio su mio
    push(ref(firebaseDb,'/chats/' + rootState.auth.userDetails.userId +'/' + payload.otherUserId),payload.message)
    //cambio da 'me' a 'them' e scrivo su altro utente
    payload.message.from = 'them'
    push(ref(firebaseDb,'/chats/' + payload.otherUserId+'/' +rootState.auth.userDetails.userId ),payload.message)


}