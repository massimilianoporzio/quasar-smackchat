import {set} from 'vue'

export function setUserDetails (state, payload) {
  state.userDetails = payload
}

export function setLoading(state,isLoading) {
  state.isLoading = isLoading
}

export function addUser(state, payload) {
  state.users[payload.userId] = payload.userDetails

}

export function updateUser(state, payload) {
  Object.assign(state.users[payload.userId], payload.userDetails)

}
