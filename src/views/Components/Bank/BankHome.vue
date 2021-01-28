<template>
  <div>
    <a-card title="我的信息" style="max-width: 40%">
      <p>欢迎您，{{ name }} (银行)</p>
      <p>账号地址：{{ addr }}</p>
      <p>剩余信用点: {{ credit }}</p>
      <p>可用现金: {{ cash }} </p>
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
      outCredit: 0,
      cash: 0,
      credit: 0
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    fetch () {
      api.bank.getBank(this.$store.state.username)
        .then((res) => {
          const data = res.data.data[0]
          this.name = data.name
          this.addr = data.addr
          this.inCredit = data.inCredit
          this.outCredit = data.outCredit
          this.cash = data.cashAmount
          this.credit = data.creditAmount
        })
    }
  }
}
</script>