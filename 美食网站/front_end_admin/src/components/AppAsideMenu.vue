<template>
    <el-row>
        <el-col :span="24">
            <el-menu
                background-color='#545c64'
                text-color="white"
                active-text-color="#ffd04b"
                mode="vertical"

                default-active='/'
                :router="true"
            >
                <el-menu-item v-for="(menu,n) of menus"  :key="n" :index="menu.name">
                    <span slot='title'>{{menu.text}}</span>
                </el-menu-item>    
                

            </el-menu>
        </el-col>
    </el-row>
</template>

<script lang="ts">
    
    import {Vue,Component} from 'vue-property-decorator'
    import AsideMenuData from '../data/AsideMenuData'

    @Component
    export default  class AppAsideMenu extends Vue{
        //菜单数组
        private menus:Array<any> = []

        created() {
            this.menus = AsideMenuData
        }
    }
</script>

<style>
.el-menu-item .is-active{
    background-color :rgb(67,74,80)
}
</style>