<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/nico.png" alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button type='info' @click='logout'>退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse?'64px':'200px'">

        <div class="toggle-button" @click="toggleCollapse">|||</div>

        <!-- 侧边栏菜单 -->
        <el-menu :unique-opened='true' :collapse='isCollapse' :collapse-transition='false' 
        :router='true' background-color="#333744" text-color="#fff" active-text-color="#409eff">

          <!-- 一级菜单 -->
          <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <i :class="iconObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+subitem.path" v-for="subitem in item.children" :key="subitem.id">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subitem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <!-- 右侧内容布局 -->
      <el-main>
          <!-- 路由占位符 -->
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data(){
        return{
            // 左侧菜单数据
            menulist:[],
            iconObj:{
                '125':'iconfont icon-user',
                '103':'iconfont icon-tijikongjian',
                '101':'iconfont icon-shangpin',
                '102':'iconfont icon-danju',
                '145':'iconfont icon-baobiao'
            },
            // 是否折叠
            isCollapse:false
        }
    },
    created() {
        this.getMenuList()
    },
    methods: {
      logout() {
        window.sessionStorage.clear()
        this.$router.push('/login')
      },
    //   获取所有的菜单
      async getMenuList(){
        const {data:res} = await this.$http.get('menus')
        if(res.meta.status!==200) return this.$message.error(res.meta.msg)
        this.menulist = res.data
        // console.log(this.menulist)
      },
    //   点击安妮切换菜单折叠与展开
      toggleCollapse(){
          this.isCollapse = !this.isCollapse
      }
    },
  }

</script>

<style lang="less" scoped>
  .home-container {
    height: 100%;
  }

  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 20px;

    div {
      display: flex;
      align-items: center;

      img {
        margin-top: -6px;
        width: 75px;
        height: 75px;
      }

      span {
        margin-left: 15px;
      }
    }
  }

  .el-aside {
    background-color: #333744;
    .toggle-button{
        background-color: #4a5064 ;
        font-size: 10px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        letter-spacing: 0.3em;
        cursor: pointer;
    }
    .el-menu{
        border-right: 0;
    }
    .iconfont{
        margin-right: 10px;
    }
  }

  .el-main {
    background-color: #eaedf1;
  }

</style>
