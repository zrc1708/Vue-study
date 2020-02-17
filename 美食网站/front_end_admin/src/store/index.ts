import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export interface ISTATE{
  routeName:string
}

export default new Vuex.Store({
  state: {
    routeName:'/'
  },
  mutations: {
    setRouteName(state,payload:string){
      state.routeName = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
