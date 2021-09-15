<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="$route.fullPath.includes('/chat')"
          @click="$router.go(-1)"
          flat dense icon="arrow_back" label="Back" />
        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>

          <q-btn class="absolute-right q-px-md"
                 to="/auth"
                 v-if="!isLoading && !userDetails.userId"
                 flat dense icon="account_circle" label="Login"
                 no-caps
          />

        <q-btn class="absolute-right q-px-md"
               v-else-if="!isLoading"
               @click="logoutUser"
               align="between"
               flat dense icon="account_circle"
               no-caps
        ><span style="padding-left:10px">Logout<br>{{userDetails.name}}</span>

        </q-btn>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];

import { defineComponent, ref } from 'vue'
import {mapState, mapActions} from 'vuex'
import mixinOtherUserDetails from "src/mixins/mixinOtherUserDetails";

export default defineComponent({
  name: 'MainLayout',
  mixins: [mixinOtherUserDetails],
  methods: {
    ...mapActions('auth',['logoutUser'])
  },
  computed: {
    ...mapState('auth',['userDetails','isLoading']),
    title () {
      let currentPath =  this.$route.fullPath
      if (currentPath == '/'){
        return 'SmackChat'
      }
      else if (currentPath == '/auth') {return 'Login'}
      else if (currentPath.includes('/chat')) {return `Chat with ${this.otherUserDetails.name}`}
      else {return ''}
    }
  },
  components: {
    // EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>

<style lang="stylus">
.q-toolbar
  .q-btn
    line-height: 1.2;

</style>
