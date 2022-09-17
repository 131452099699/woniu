import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:JSON.parse(localStorage.getItem('user')), //存储当前用户信息
    token:localStorage.getItem('token'), 
  },
  getters: {
  },
  mutations: {
    clearUserState(state){
      state.user=undefined
      state.token=undefined
      localStorage.clear() 
    },

    saveUserState(state,payload){
      state.user=payload.user
      state.token=payload.token
      // 存入localstorage
      localStorage.setItem('token',payload.token)
      localStorage.setItem('user',JSON.stringify(payload.user))
    }
  },
  actions: {
  },
  modules: {
  }
})
