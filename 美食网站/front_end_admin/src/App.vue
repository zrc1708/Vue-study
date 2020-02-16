<template>
  <div id="app">
    <el-container>

      <el-header>
        <h1 class="h1 fl"><i class="iconfont icon-hotfood"></i>后台管理</h1>

        <el-dropdown class="fr" trigger = "click">
          <span class="el-dropdown-link">
            Admin<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </el-header>

      <el-container>
        <el-aside>
          <AppAsideMenu></AppAsideMenu>
        </el-aside>
        <el-main>main</el-main>
      </el-container>

    </el-container>
  </div>
</template>

<script lang="ts">
  import {Vue,Component} from 'vue-property-decorator'
  import AppAsideMenu from '@/components/AppAsideMenu.vue'

  @Component({
    components:{
      AppAsideMenu
    }
  })
  export default class App extends Vue {
    name: string = '后台管理'
  }
</script>