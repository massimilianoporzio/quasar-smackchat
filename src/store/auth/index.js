import state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

// leggo dal file di boot
import {firebaseAuth, firebaseDb} from "boot/firebase";

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
