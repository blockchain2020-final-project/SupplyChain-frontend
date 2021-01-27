<template>
  <div>
    <a-card title="我的信息" style="max-width: 40%">
      <p>欢迎您，{{ name }} (核心企业)</p>
      <p>账号地址：{{ addr }}</p>
      <p>共收到信用点：{{ inCredit }}</p>
      <p>共使用信用点：{{ outCredit }}</p>
      <p>剩余信用点: {{ inCredit - outCredit }} </p>
    </a-card>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'CoreCompanyHome',
  data () {
    return {
      name: '',
      addr: '',
      inCredit: 0,
      outCredit: 0
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    fetch () {
      api.coreCompany.getCoreCompany(this.$store.state.username)
        .then(res => {
          const {
            name, addr, inCredit, outCredit
          } = res.data.data
          this.name = name
          this.addr = addr
          this.inCredit = inCredit
          this.outCredit = outCredit
        })
    }
  }
}
</script>
