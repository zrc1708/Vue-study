<template>
    <div>
         <el-tabs >
            <el-tab-pane label="分类管理" name="first">
                <el-tree :data = "categorys"
                    :default-expand-all = "true"
                    :show-checkbox = "true"
                    :draggable = "true">

                    <!-- slot-scope:根据el-tree的data类循环生成span，在循环生成过程找那个，传入连个变量，node，data -->
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{data.label}}</span>
                        <button>点击</button>
                    </span>
                </el-tree>
            </el-tab-pane>

            <el-tab-pane label="添加分类" name="second">
                添加分类
            </el-tab-pane>
        </el-tabs>

        
    </div>
</template>

<script lang="ts">
    import {Vue,Component} from 'vue-property-decorator'
    import axios from 'axios'

    @Component
    export default class Category extends Vue{
        categorys:Array<any> = [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }]

        async created() {
            let nico = await axios({
                method: 'get',
                url:"/api/admin/category"
            })  
            console.log(nico)
        //     axios({
        //         method: 'get',
        //         url:"http://127.0.0.1:8888/admin/category"
        //     })  
        }
    }

    
</script>