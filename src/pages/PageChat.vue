<template>
  <q-page class="flex column">
    <q-banner class="bg-grey-4 text-center">
      User is offline.
     </q-banner>
    <div class="q-pa-md column col justify-end" v-if="!isChatLoading">
      <q-chat-message
        v-for="message in messages" :key="message.text"
        :name="message.from"
        :text="[message.text]"
        :sent = "message.from == 'me' ? true : false"
      />

    </div>
    <div class="q-pa-md q-mx-auto column col justify-center" v-else>
      <q-spinner-comment
          color="primary"
          size="12em"
      />
    </div>
    <q-footer elevated>

        <q-toolbar>
          <q-form class="full-width">
          <q-input @keyup.enter="sendMessage"
            bg-color="white" rounded outlined
             v-model="newMessage" label="Message" dense>

            <template v-slot:after>
              <q-btn  round dense flat color="white" icon="send" type="submit" @click="sendMessage"/>
            </template>
          </q-input>
          </q-form>

        </q-toolbar>


    </q-footer>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import {mapActions, mapState} from "vuex";

export default defineComponent({
  data () {
    return {
    newMessage : '',
      // messages: [
      //   {
      //     text: 'Hey Jim how are you',
      //     from: 'me'
      //   },
      //   {
      //     text: 'Good Thanks, Danny! How are you',
      //     from: 'them'
      //   },
      //   {
      //     text: 'Pretty good',
      //     from: 'me'
      //   }
      // ]
  }},
  computed: {
    ...mapState('chat',['isChatLoading','messages'])
  },
  methods: {
    ...mapActions('chat',['firebaseGetMessage','firebaseStopGettingMessages']),
    sendMessage() {
      this.messages.push({
        text: this.newMessage,
        from: 'me'
      })
      this.newMessage=''

    }
  },
  mounted () {
    this.firebaseGetMessage(this.$route.params.otherUserId)
  },
  unmounted() {
    this.firebaseStopGettingMessages()
  }
})
</script>

<style>

</style>
