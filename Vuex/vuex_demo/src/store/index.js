import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count:0
  },
  mutations: {
    // 只有mutations可以直接修改state数据
    add(state){
      // setTimeout(() => {
      //   // 不要在mutations中执行异步操作
      //   state.count++
      // }, 1000);
      state.count++
    },
    addN(state,step){
      state.count+=step
    },
    sub(state){
      state.count--
    },
    subN(state,step){
      state.count-=step
    },
  },
  actions: {
    // actions负责执行异步操作
    addAsync(context){
      setTimeout(() => {
        // actions中不能直接修改state中的数据，要通过这样的操作
        context.commit('add')
      }, 1000);
    },
    addNAsync(context,step){
      setTimeout(() => {
        context.commit('addN',step)
      }, 1000);
    },
    subAsync(context){
      setTimeout(() => {
        context.commit('sub')
      }, 1000);
    },
    subNAsync(context,step){
      setTimeout(() => {
        context.commit('subN',step)
      }, 1000);
    },
  },
  getters:{
    showNum(state){
      return '当前最新的数量是'+state.count
    }
  },
  modules: {
  }
})
