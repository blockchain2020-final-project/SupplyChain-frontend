<template>
  <div>
    <a-card title="我的信息" style="max-width: 40%">
      <p>欢迎您，管理员</p>
      <p>账号地址：{{ addr }}</p>
      <p>已发放信用点: {{ outCredit }}</p>
    </a-card>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'AdministratorHome',
  data () {
    return {
      outCredit: 0
    }
  },
  computed: {
    addr() {
      return this.$store.state.username
    }
  },
  created() {
    api.administrator.getInfo()
      .then(res => {
        this.outCredit = res.data.data.out_credit
      })
  }
}
</script>
