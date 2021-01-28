<template>
  <div>
    <a-card title="我的信息" style="max-width: 40%">
      <p>欢迎您，{{ name }} (普通企业)</p>
      <p>账号地址：{{ addr }}</p>
      <p>剩余信用点: {{ credit }} </p>
      <p>可用金额：{{ cash }} </p>
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
      outCredit: '',
      cash: 0,
      credit: 0
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
          this.name = res.data.data[0].name
          this.addr = res.data.data[0].addr
          this.inCredit = res.data.data[0].inCredit
          this.outCredit = res.data.data[0].outCredit
          this.cash = res.data.data[0].cashAmount
          this.credit = res.data.data[0].creditAmount
        })
    }
  }
}
</script>