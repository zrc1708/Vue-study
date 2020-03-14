<template>
  <div >
    <!-- <h3>当前最新的count值为：{{$store.state.count}}</h3> -->
    <h3>{{$store.getters.showNum}}</h3>
    <button @click="btnHander1">+1</button>
    <button @click="btnHander2">+N</button>
    <button @click="btnHander3">+1 Async</button>
    <button @click="btnHander4">+N Async</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
      btnHander1(){
          this.$store.commit('add')
      },
      btnHander2(){
          this.$store.commit('addN',3)
      },
      btnHander3(){
        // 异步的加1
        // dispatch函数，专门用来触发action
        this.$store.dispatch('addAsync')
      },
      btnHander4(){
        this.$store.dispatch('addNAsync',5)
      }
  },
}
</script>

<style lang="less" scoped>
  
</style>
