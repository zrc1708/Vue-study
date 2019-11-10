<template>
  <div class="container">
    
    <vheader></vheader>

    <vlist></vlist>


    <ul>
      <li>《</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>》</li>
    </ul>
  </div>

</template>

<script>
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