<template>
  <div>
    <a-card title="我的信息" style="max-width: 40%">
      <p>欢迎您，{{ name }} </p>
      <p>账号地址：{{ addr }}</p>
      <p>得到的信用点: {{ inCredit }} </p>
      <p>已发放信用点: {{ outCredit }}</p>
      <p>剩余信用点: {{ inCredit - outCredit }}</p>
    </a-card>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'BankHome',
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
      api.bank.getBank(this.$store.state.username)
        .then((res) => {
          const data = res.data.data
          this.name = data.name
          this.addr = data.addr
          this.inCredit = data.inCredit
          this.outCredit = data.outCredit
        })
    }
  }
}
</script>