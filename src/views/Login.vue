<template>
  <div id="login-body">
    <div id="views-components-form-login-inner">
      <a-form
        id="views-components-form-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
        :style="{ width: '400px' }"
      >
        <a-form-item>
          <div id="form-title">
            用户登录
          </div>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'username',
              { rules: [{ required: true, message: '请输入登录所需哈希' }] },
            ]"
            type="password"
            placeholder="哈希值"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" class="login-form-button" block>
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Login',
  computed: {
    ...mapGetters([
      'isLogined'
    ])
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'user_login' })
  },
  mounted () {
    if (this.isLogined) {
      this.$router.push('/home')
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const username = values.username
          const password = values.password
          this.$store.dispatch('login', {
            username,
            password
          }).then(() => {
            this.$message.success('登录成功')
            this.$router.push('/home')
          })
        }
      })
    }
  }
}
</script>

<style scoped>
#login-body {
  background-color: blue;
  height: 100%;
  background-image: url('../../img/bg.jpg');
  background-size: 100% 100%;
}

#views-components-form-login .login-form {
  max-width: 300px;
}

#views-components-form-login-inner {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  padding: 3%;
  border: 1px solid black;
  box-shadow: 8px 8px 3px #888888;
  background-color: #ffffff;
}

#form-title {
  text-align: center;
}
</style>
