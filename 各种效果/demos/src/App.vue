<template>
  <div id="app">
    <div class="list">
      <router-link to="/image" >图片上传到图床</router-link>
      <router-link to="/md">读取md</router-link>
      <router-link to="/onlinemd">读取网络md</router-link>
      <router-link to="/search">搜索联想</router-link>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
      }
	  }
  } 
</script>

<style lang="less">
  body{
    margin: 0;
    padding: 0;
  }
  #app{
    display: flex;
    .list{
      width: 200px;
      height: 100vh;
      background-color: #eeeeee;
      a{
        display: block;
      }
    }
  }
</style>
