<template>
    <div>
        <!-- 面包屑导航-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>参数列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片-->
        <el-card>
            <el-alert show-icon title="注意：只能选择三级分类" type="warning" :closable="false"></el-alert>
            <!--选择商品分类区域 -->
            <el-row class="cat_rol">
                <el-col>
                    <span>选择商品分类：</span>
                    <!--选择商品分类的级联选择框 -->
                    <el-cascader v-model="selectedCateKeys" :options="cateList" 
                    :props="cateProps" @change="handleChange"></el-cascader>
                </el-col>
            </el-row> 
            <!-- tab页签区域 -->
            <el-tabs v-model="activeName" @tab-click="handleTabClick">
                <el-tab-pane label="动态参数" name="many">
                    <el-button type="primary" size="small" :disabled="isBtnDisable" @click="addDialogVisible = true">添加参数</el-button>
                    <!-- 动态参数表格 -->
                    <el-table :data="manyTableData" border stripe>
                        <el-table-column type="expand">
                            <template slot-scope="scope">
                                <!-- 循环渲染tag便签 -->
                                <el-tag v-for="(item, index) in scope.row.attr_vals" :key="index" closable>
                                    {{item}}
                                </el-tag>
                                <!-- 输入文本框 -->
                                <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput"
                                size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"></el-input>
                                <!-- 添加按钮 -->
                                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column type="index"></el-table-column>
                        <el-table-column label="参数名称" prop="attr_name"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="primary" icon="el-icon-search" size="mini" @click="showEditDialog(scope.row.attr_id)">编辑</el-button>
                                <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeParams(scope.row.attr_id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="静态属性" name="only">
                    <el-button type="primary" size="small" :disabled="isBtnDisable" @click="addDialogVisible = true">添加属性</el-button>
                    <!-- 静态参数表格 -->
                    <el-table :data="onlyTableData" border stripe>
                        <el-table-column type="index"></el-table-column>
                        <el-table-column label="属性名称" prop="attr_name"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="primary" icon="el-icon-search" size="mini" @click="showEditDialog(scope.row.attr_id)">编辑</el-button>
                                <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeParams(scope.row.attr_id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-card>
        <!-- 添加参数的对话框 -->
        <el-dialog :title="'添加'+titleText" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
            <!-- 添加参数的表单 -->
            <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="100px">
                <el-form-item :label="titleText" prop="attr_name">
                    <el-input v-model="addForm.attr_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addParams">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改参数的对话框 -->
        <el-dialog :title="'修改'+titleText" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
            <!-- 添加参数的表单 -->
            <el-form ref="editFormRef" :model="editForm" :rules="editFormRules" label-width="100px">
                <el-form-item :label="titleText" prop="attr_name">
                    <el-input v-model="editForm.attr_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editParams">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 商品分类列表
            cateList:[],
            // 级联选择器配置对象
            cateProps:{
                expandTrigger: 'hover',
                value:'cat_id',
                label:'cat_name',
                children:'children'
            },
            // 级联选择框双向绑定到的数组
            selectedCateKeys:[],
            // 被激活的页签的名称
            activeName:'many',
            // 动态参数数据
            manyTableData:[],
            // 静态参数数据
            onlyTableData:[],
            // 控制添加对话框的显示
            addDialogVisible:false,
            // 添加参数的表单数据对象
            addForm:{},
            // 添加参数表单的验证规则对象
            addFormRules:{
                attr_name:[
                    { required: true, message: '请输入参数名', trigger: 'blur' }
                ]
            },
            // 控制修改对话框的显示
            editDialogVisible:false,
            // 修改的表单数据对象
            editForm:{},
            // 修改表单验证规则
            editFormRules:{
                attr_name:[
                    { required: true, message: '请输入参数名', trigger: 'blur' }
                ]
            },
            // 按钮与文本框切换显示
            inputVisible:false,
            // 文本框输入的内容
            inputValue:''
        }
    },
    created() {
        this.getCateList()
    },
    methods: {
        async getCateList(){
            const {data:res} = await this.$http.get(`categories`)   
            if(res.meta.status!==200) return this.$message.error('获取商品分类失败')
            this.cateList = res.data
        },
        // 级联选择框选择项变化
        handleChange(){
            this.getParamsDate()
        },
        // tab页签点击
        handleTabClick(){
            this.getParamsDate()
        },
        // 获取参数列表
        async getParamsDate(){
            // 选中的不是三级分类
            if(this.selectedCateKeys.length!==3){
                this.selectedCateKeys = []
                return
            }
            // 根据所选分类的id和所处面板，获取参数
            const {data:res} = await this.$http.get(`categories/${this.cateId}/attributes`,{params:{sel:this.activeName}})   
            if(res.meta.status!==200) return this.$message.error('获取参数列表失败')
            res.data.forEach(item=>{
                item.attr_vals = item.attr_vals ? item.attr_vals.split(' '):[]
            })
            if(this.activeName ==="many"){
                this.manyTableData = res.data
            }else{
                this.onlyTableData = res.data
            }
        },
        // 对话框的关闭
        addDialogClosed(){
            this.$refs.addFormRef.resetFields()
        },
        // 添加参数
        async addParams(){
            this.$refs.addFormRef.validate( async valid => {
                if(!valid) return
            })
            const {data:res} = await this.$http.post(`categories/${this.cateId}/attributes`,{
                attr_name:this.addForm.attr_name,
                attr_sel:this.activeName
            })   
            if(res.meta.status!==201) return this.$message.error('添加参数失败')
            this.$message.success('添加参数成功')
            this.getParamsDate()
            this.addDialogVisible = false
        },
        // 点击按钮展示修改对话框
        async showEditDialog(attr_id){
            // 查询当前参数的信息
            const {data:res} = await this.$http.get(`categories/${this.cateId}/attributes/${attr_id}`,{params:{
                attr_sel : this.activeName
            }})   
            if(res.meta.status!==200) return this.$message.error('获取参数失败')
            this.editForm = res.data
            this.editDialogVisible = true
        },
        // 重置修改表单
        editDialogClosed(){
            this.$refs.editFormRef.resetFields()
        },
        //点击按钮修改参数信息
        async editParams(){
            this.$refs.editFormRef.validate( async valid => {
                if(!valid) return
            })
            const {data:res} = await this.$http.put(`categories/${this.cateId}/attributes/${this.editForm.attr_id}`,{
                attr_name:this.editForm.attr_name,
                attr_sel:this.activeName
            })   
            if(res.meta.status!==200) return this.$message.error('修改参数失败')
            this.$message.success('修改参数成功')
            this.getParamsDate()
            this.editDialogVisible = false
        },
        // 根据id删除
        async removeParams(attr_id){  
            const confirmResult = await this.$confirm('此操作将永久删除该参数，是佛继续', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err=>err)
            if(confirmResult!=='confirm') return this.$message.info('已取消删除')
            // 删除的业务逻辑
            const {data:res} = await this.$http.delete(`categories/${this.cateId}/attributes/${attr_id}`)   
            if(res.meta.status!==200) return this.$message.error('删除参数失败')
            this.$message.success('删除参数成功')
            this.getParamsDate()
        },
        // 文本框失焦或按下回车
        handleInputConfirm(){
            console.log(123);
        },
        // 点击按钮显示文本框
        showInput(){
            this.inputVisible = true
        }
    },
    computed: {
        // 如果按钮需要被禁用，返回true
        isBtnDisable(){
            if(this.selectedCateKeys.length!==3)
                return true
            else return false
        },
        // 当前选中的三级分类的id
        cateId(){
            if(this.selectedCateKeys.length===3)
                return this.selectedCateKeys[2]
            else
                return null
        },
        //动态计算标题的文本
        titleText(){
            if(this.activeName === 'many'){
                return '动态参数'
            }else{
                return '静态属性'
            }
        }
    },
}
</script>
<style lang="less" scoped>
    .cat_rol{
        margin: 15px 0;
    }
    .el-cascader{
        width: 500px!important;
    }
    .el-tag{
        margin: 10px;
    }
    .input-new-tag{
        width: 120px!important;
    }
</style>