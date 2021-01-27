<template>
  <div>
    <a-layout id="components-layout-demo-top-side-2">
      <a-layout-header id="layout-header">
        <span class="title">
          ABCDEFG 供应链金融管理系统
        </span>
        <span class="user-controller">
          <a-dropdown>
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              <a-icon type="user" style="fontSize: 19px"/>
            </a>
            <a-menu slot="overlay">
              <a-menu-item @click="() => this.$router.push('/home')">
                回到主页
              </a-menu-item>
              <a-menu-item @click="logout">
                退出登录
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </a-layout-header>

       <a-layout>
        <a-layout-sider
          width="200"
          style="background: #fff; text-align: center;"
          v-model="collapsed"
          theme="light"
        >
          <a-menu
            theme="light"
            mode="inline"
            :default-selected-keys="menu.selected"
            @click="menuClick"
            v-model="selectedMenu"
          >
            <a-menu-item
              v-for="component in menu.menus"
              :key="component.key"
            >
              <a-icon :type="component.icon" />
              <span> {{ component.description }} </span>
            </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout>
          <a-layout-content
            :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '500px' }"
          >
            <router-view
              :style="{height: '100%'}"
            />
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as Identity from '@/util/identity'
import menu from '@/util/menu'

export default {
  name: 'Layout',
  data () {
    return {
      collapsed: false,
      menu: {},
      currentKey: '',
      selectedMenu: []
    }
  },
  created () {
    this.setMenu()
    this.selectedMenu = this.menu.selected
  },
  computed: {
    ...mapGetters([
      'getIdentity'
    ]),
    currentRoutePath () {
      return this.$route.path
    }
  },
  watch: {
    getIdentity () {
      // console.log('getidentity change', newVal)
      this.setMenu()
    },
    currentRoutePath (newPath) {
      this.selectedMenu = [newPath]
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/')
          this.$message.success('退出成功')
        })
    },
    setMenu () {
      const newVal = this.getIdentity
      if(newVal === Identity.Administrator) {
        this.menu = menu.Administrator
      } else {
        this.menu = {}
      }
    },
    menuClick (newkey) {
      const url = newkey.key
      if (url !== this.$route.path) {
        this.$router.push(url)
      }
    }
  }
}
</script>


<style scoped>
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}

#layout-header {
  background: rgb(243, 209, 170);
  border-bottom: 2px solid black;
  text-align: center;
}

.title {
  width: 80%;
  font-size: 28px;
  color: black;
  font-weight: bolder;
}
.user-controller {
  float: right;
}
</style>