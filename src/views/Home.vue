<template>
  <div>
    Please wait, system is directing...
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as Identity from '@/util/identity.ts'

export default {
  name: 'Home',
  computed: {
    ...mapGetters([
      'isLogined',
      'getIdentity'
    ])
  },
  mounted () {
    if (this.isLogined === false) {
      this.$router.push('/')
    } else {
      if (this.getIdentity === Identity.Administrator) {
        this.$router.push('/home/administrator')
      } else if (this.getIdentity === Identity.Bank) {
        this.$router.push('/home/bank')
      } else if (this.getIdentity === Identity.CoreCompany) {
        this.$router.push('/home/core-company')
      } else if (this.getIdentity === Identity.Company) {
        this.$router.push('/home/company')
      } else if (this.getIdentity === Identity.Certifier) {
        this.$router.push('/home/certifier')
      } else {
        this.$router.push('/');
      }
    }
  }
}
</script>
