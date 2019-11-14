<template>
  <div class="container">
    
    <vheader></vheader>

    <vlist></vlist>


  </div>

</template>

<script>
/**
 * 为了记录和传递用户身份，每次请求的时候服务器清除当前这次的客户端是什么身份
 * 
 * cookie
 * 1.cookie其实是通过头信息传递的一个数据（这个数据定义了名称）
 * 
 * 2.当服务器想发送一个身份表示给客户端，就通过set-cookie这个头信息发送，浏览器接收到
 * 这个头信息，就会自动的保存该数据
 * 
 * 3.客户端每次请求处理一些我们设置的数据，浏览器还会发送一些头信息，这个头信息包含了浏览器存储的所有
 * cookie，把他放在请求头的cookie中，发送给服务器，服务器一次来判读客户端的身份
 * 
 * 浏览器每次发送请求的时候，会把与这次请求所在同一个域下的cookie搜集起来，用key=value的形式，
 * 多个使用 分好+空格的形式，放到头信息的cookie字段中，发给服务端
 */
import Vheader from './components/Vheader'
import Vlist from './components/Vlist'
  export default {
      data(){
        return{}
      },
      components:{
        Vheader,
        Vlist
      },
      created() {
        
      },
  }
</script>

<style>

</style>