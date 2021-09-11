<template>
  <router-view />
</template>
<script>
import {mapActions} from "vuex";
import {onAuthStateChanged} from 'firebase/auth'

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  methods: {
    ...mapActions('auth',['handleAuthStateChange'])
  },
  mounted() {
    this.handleAuthStateChange()
  }
})
</script>
