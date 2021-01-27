<template>
  <div>
    <a-card title="我的信息" style="max-width: 40%">
      <p>欢迎您，{{ name }} (第三方监管机构) </p>
      <p>账号地址：{{ addr }}</p>
    </a-card>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'CertifierHome',
  data () {
    return {
      name: '',
      addr: ''
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    fetch () {
      api.certifier.getCertifier(this.$store.state.username)
        .then(res => {
          this.name = res.data.data.name
          this.addr = res.data.data.addr
        })
    }
  }
}
</script>
