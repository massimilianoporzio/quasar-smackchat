<template>
  <q-page class="page-chat flex column" ref="pageChat">
    <q-banner class="bg-grey-4 text-center fixed-top" v-if="!isChatLoading && !otherUserDetails.online">
      User {{otherUserDetails.name}} is  {{otherUserDetails.online ? 'online' : 'offline'}}.
     </q-banner>
    <div class="q-pa-md column col justify-end" v-if="!isChatLoading">
      <q-chat-message
        v-for="(message, key) in messages" :key="key"
        :name="message.from == 'me' ? userDetails.name : otherUserDetails.name"
        :text="[message.text]"
        :sent = "message.from == 'me' ? true : false"
        :bg-color="message.from =='me'?'white':'light-green-2'"
      />

    </div>
    <div id="chatDiv" class="q-pa-md q-mx-auto column col justify-center" v-else>
      <q-spinner-comment
          color="primary"
          size="12em"
      />
    </div>
    <q-footer elevated>

        <q-toolbar>
          <q-form class="full-width">
          <q-input @keyup.enter="sendMessage" ref="newMessage"
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
import {mapActions, mapState, mapMutations,mapGetters} from "vuex";
import mixinOtherUserDetails from "src/mixins/mixinOtherUserDetails";
import {firebaseSendMessage, sendMessage} from "src/store/chat/actions";


import { scroll } from 'quasar'
const { getScrollTarget } = scroll

export default {
  data () {

    return {

      newMessage : '',
      showMessages: false

  }},
  mixins: [mixinOtherUserDetails],
  computed: {
    ...mapState('chat',['isChatLoading','messages']),
    ...mapState('auth',['userDetails','users']),


  },
  watch:{
    messages: { handler(val) {

       if(Object.keys(val).length){

         this.scrollToBottom()

       }
      },
      deep: true
    }

  },
  methods: {
    ...mapActions('chat',['firebaseGetMessage','firebaseStopGettingMessages','firebaseSendMessage']),
    ...mapMutations('chat',['setIsLoadingChat']),
    scrollToBottom() {
      console.log('SCROLL!')
      let pageChat = this.$refs.pageChat.$el;

      setTimeout(()=>{
          window.scrollTo({
            top: pageChat.scrollHeight,
            left: 0,
            behavior: 'smooth'
          });
        },520)
  }
    ,
    clearMessage(){
      this.newMessage=''
      this.$refs.newMessage.focus()

    },
    sendMessage() {
      if(!(this.newMessage===''))
      {
        let payload = {
          message: {
            text: this.newMessage,
            from: 'me'
          },
          otherUserId: this.$route.params.otherUserId
        }
        this.firebaseSendMessage(payload)
        this.clearMessage()
      }


    }
  },
  mounted () {
    this.firebaseGetMessage(this.$route.params.otherUserId)
    // this.scrollToBottom()

  },
  unmounted() {
    this.firebaseStopGettingMessages()
  }
}
</script>

<style lang="stylus">
 .page-chat
   background: #e2dfd5
   &:after
     content ''
     display block
     position fixed
     left 0
     right 0
     top 0
     bottom 0
     z-index 0
     opacity 0.1
     background-image:radial-gradient(circle at 100% 150%, silver 24%, white 24%, white 28%, silver 28%, silver 36%, white 36%, white 40%, transparent 40%, transparent), radial-gradient(circle at 0    150%, silver 24%, white 24%, white 28%, silver 28%, silver 36%, white 36%, white 40%, transparent 40%, transparent),     radial-gradient(circle at 50%  100%, white 10%, silver 10%, silver 23%, white 23%, white 30%, silver 30%, silver 43%, white 43%, white 50%, silver 50%, silver 63%, white 63%, white 71%, transparent 71%, transparent),     radial-gradient(circle at 100% 50%, white 5%, silver 5%, silver 15%, white 15%, white 20%, silver 20%, silver 29%, white 29%, white 34%, silver 34%, silver 44%, white 44%, white 49%, transparent 49%, transparent),     radial-gradient(circle at 0    50%, white 5%, silver 5%, silver 15%, white 15%, white 20%, silver 20%, silver 29%, white 29%, white 34%, silver 34%, silver 44%, white 44%, white 49%, transparent 49%, transparent)
     background-size: 100px 50px
  .q-message
    z-index 1
  .q-banner
    top 50px
    z-index 2
    opacity 0.8

</style>
