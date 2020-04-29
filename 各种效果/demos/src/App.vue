<template>
  <div id="app">
    <div class="list">
      <router-link to="/image">图片上传到图床</router-link>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

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
    }
  }
</style>
