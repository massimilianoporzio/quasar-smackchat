<template>
  <q-form @submit="submitForm">
    <q-input outlined v-model="formData.name" label="Name" class="q-pb-md" v-if="tab == 'register'"/>
    <q-input outlined v-model="formData.email" label="Email" type="email" class="q-pb-md"/>
    <q-input outlined v-model="formData.password" label="Password" type="password" class="q-pb-md"/>
    <div class="row">
      <q-space />
      <q-btn color="primary"
             type="submit"
             :label="tab" />
    </div>


  </q-form>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "LoginRegister",
  props: {
    tab:{
      type: String,
      required: true
    }

  },
  methods: {
    ...mapActions('ciccia',['registerUser']),
    submitForm(){
      if (this.tab == 'login'){
        console.log('Login the user')
      }
      else {
        this.registerUser(this.formData)
      }
    }
  },
  data() {
    return {
      formData: {
        name: '',
        email: '',
        password:''
      }
    }
  }
}
</script>

<style scoped>

</style>
