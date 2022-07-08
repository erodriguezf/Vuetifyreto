import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: localStorage.getItem('username'),
    token:localStorage.getItem('token')
  },
  getters: {
    
  },
  mutations: {
    addEmail(state){
     state.username=state.user;
     state.token=state.token1;
    }
  },
  actions: {
    addEmailAction(context){
      context.commit('addEmail');
    },
  },
  modules: {
  }
})
