<template>
  <div id="app">
    <login v-if='isLogined === false'/>
    <layout v-else/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Layout from '@/views/Layout.vue'
import Login from '@/views/Login.vue'

export default {
  name: 'App',
  components: {
    Layout,
    Login
  },
  beforeCreate () {
    this.$store.dispatch('getCurrentUser')
  },
  computed: {
    ...mapGetters([
      'isLogined'
    ])
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  height: 650px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
