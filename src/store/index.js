import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

// 1.下载
// yarn add
// vuex-persistedstate@3.2.1
// 2.引入
// import createPersistedstate from 'vuex-persistedstate'
// 3.调用
// plugins:[createPersistedstate()]

// 配置项
// key:默认值是vuex
// storage:存储的方式，默认值是本地存储
// reducer:指定持久化哪些数据.函数，return一个对象，对象就作为存储的value
// -参数state
export default new Vuex.Store({
  plugins: [createPersistedState({
    key: 'HEIMA_TOUTIAO',
    // storage: window.sessionStorage,
    reducer ({ tokenObj, myChannels, history }) {
      return { tokenObj, myChannels, history }
    }
  })],
  state: {
    tokenObj: {},
    myChannels: [],
    history: []
  },
  getters: {
    isLogin (state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.tokenObj = token
    },
    SET_MY_CHANNELS (state, myChannels) {
      state.myChannels = myChannels
    },
    SET_HISTORY (state, history) {
      state.history = history
    }
  },
  actions: {
  }
})
