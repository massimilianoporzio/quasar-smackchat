import {set} from 'vue'

export function setIsLoadingChat (state, isLoading) {
   state.isChatLoading = isLoading
}

export function addMessage(state,payload){
   state.messages[payload.messageId] = payload.messageDetails
}

export function clearMessages(state){
   state.messages = {}
}

