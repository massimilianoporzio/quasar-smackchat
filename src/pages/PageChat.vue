<template>
  <q-page class="flex column">
    <q-banner class="bg-grey-4 text-center">
      User is offline.
     </q-banner>
    <div class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="message in messages" :key="message.text"
        :name="message.from"
        :text="[message.text]"
        :sent = "message.from == 'me' ? true : false"
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

export default defineComponent({
  data () {
    return {
    newMessage : '',
      messages: [
        {
          text: 'Hey Jim how are you',
          from: 'me'
        },
        {
          text: 'Good Thanks, Danny! How are you',
          from: 'them'
        },
        {
          text: 'Pretty good',
          from: 'me'
        }
      ]
  }},
  methods: {
    sendMessage() {
      this.messages.push({
        text: this.newMessage,
        from: 'me'
      })
      this.newMessage=''

    }
  }
})
</script>

<style>

</style>
