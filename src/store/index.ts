/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

import api from '@/api'

import * as Identity from '@/util/identity.ts'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    usertype: Identity.Unknown,
    name: ''
  },
  mutations: {
    setUsername (state, username) {
      Vue.set(state, 'username', username)
    },
    setIdentity (state, identity: string) {
      let id = Identity.Unknown
      if (identity === 'Administrator') {
        id = Identity.Administrator
      } else if (identity === 'Bank') {
        id = Identity.Bank
      } else if (identity === 'CoreCompany') {
        id = Identity.CoreCompany
      } else if (identity === 'Company') {
        id = Identity.Company
      } else if (identity === 'Certifier') {
        id = Identity.Certifier
      } else {
        id = Identity.Unknown
      }
      Vue.set(state, 'usertype', id)
    }
  },
  actions: {
    async login ({ commit }: any, { username }: any) {
      // TODO: login with username
      api.user.login(username, '')
        .then(res => {
          const role = res.data.data.split(' ')[0]
          console.log(role)
          
        })
      commit('setUsername', username)
      commit('setIdentity', 'Company')
      console.log(this.state.usertype)
        
    },
    async getCurrentUser({ commit }) {
      commit('setUsername', '')
      commit('setIdentity', null)
    },
    async logout({ commit }) {
      commit('setUsername', '')
      commit('setIdentity', null)
    }
  },
  getters: {
    isLogined (state) {
      return state.username !== '' && state.usertype !== Identity.Unknown
    },
    getIdentity (state) {
      return state.usertype
    }
  }
})
