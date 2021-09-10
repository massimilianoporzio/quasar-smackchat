<template>
  <q-form @submit="submitForm" ref="formRef">
    <q-input outlined v-model="formData.name"
             label="Name" class="q-pb-md q-my-md" v-if="tab == 'register'"
             ref="nameRef"
             :rules="[val => !!val || 'Field is required']"
    />
    <q-input outlined
             v-model="formData.email" label="Email" type="email" class="q-pb-md q-my-md"
             ref="emailRef"
             :rules="[val => !!val || 'Field is required']"
    />
    <q-input outlined v-model="formData.password"
             :rules="[val => !!val || 'Field is required',val => val.length >= 6 || 'Password has to be at least 6 characters']"
             label="Password" type="password" class="q-pb-md q-my-md"/>

    <q-input outlined  v-if="tab == 'register'"
             :rules="[val => val==formData.password || 'Passwords do not match']"
             v-model="formData.passwordConfirm" label="Confirm Password" type="password" class="q-pb-md q-my-md"/>

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
import { ref } from 'vue'

export default {

  name: "LoginRegister",
  props: {
    tab:{
      type: String,
      required: true
    }

  },
  methods: {
    ...mapActions('auth',['registerUser','loginUser']),
    submitForm(){
      if (this.tab == 'login'){
        console.log('Login the user (component)')
        this.loginUser(this.formData)
      }
      else {
        this.$refs.formRef.validate().then(()=>{
          this.registerUser(this.formData)

        }).catch(
          console.log("PROBLEMA")
        )


      }
    }
  },
  computed: {

  },
  data() {
    return {
      formData: {
        name: '',
        email: '',
        password:'',
        passwordConfirm: '',

      },

    }
  }
}
</script>

<style scoped>

</style>
