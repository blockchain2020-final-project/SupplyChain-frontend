<template>
  <div>
    <a-card title="我的信息" style="max-width: 40%">
      <p>欢迎您，{{ name }} (普通企业)</p>
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
  name: 'CompanyHome',
  data () {
    return {
      name: '',
      addr: '',
      inCredit: '',
      outCredit: ''
    }
  },
  mounted () {
    this.fetch()
  },
  computed: {
    myAddr () {
      return this.$store.state.username
    }
  },
  methods: {
    fetch () {
      api.company.getCompany(this.myAddr)
        .then(res => {
          this.name = res.data.data.name
          this.addr = res.data.data.addr
          this.inCredit = res.data.data.inCredit
          this.outCredit = res.data.data.outCredit
        })
    }
  }
}
</script>