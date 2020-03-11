<template>
    <div>
        <!-- 面包屑导航-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图 -->
        <el-card>
            <!-- 提示 -->
            <el-alert title="添加商品信息" type="info" center show-icon :closable="false"></el-alert>
            <!-- 步骤条区域 -->
            <el-steps :space="200" :active="activeIndex-0" finish-status="success" align-center>
                <el-step title="基本信息"></el-step>
                <el-step title="商品参数"></el-step>
                <el-step title="商品属性"></el-step>
                <el-step title="商品图片"></el-step>
                <el-step title="商品内容"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
            <el-form :model="addForm" :rules="addFormrules" ref="addFormRef" label-width="100px" label-position="top">
                <!-- tab栏区域 -->
                <el-tabs v-model="activeIndex" tab-position="left" @tab-click="tabClicked" :before-leave="beforeTabLeave">
                    <el-tab-pane label="基本信息" name="0">
                        <el-form-item label="商品名称" prop="goods_name">
                            <el-input v-model="addForm.goods_name"></el-input>
                        </el-form-item>
                        <el-form-item label="商品价格" prop="goods_price">
                            <el-input v-model="addForm.goods_price" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品重量" prop="goods_weight">
                            <el-input v-model="addForm.goods_weight" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品数量" prop="goods_number">
                            <el-input v-model="addForm.goods_number" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品分类" prop="goods_cat">
                            <el-cascader class="select" v-model="addForm.goods_cat" :options="cateList" :props="cateProps" @change="handleChange"></el-cascader>
                        </el-form-item> 
                    </el-tab-pane>
                    <el-tab-pane label="商品参数" name="1">
                        <!-- 渲染表单中的item项 -->
                        <el-form-item :label="item.attr_name" v-for="item in manyTableData" :key="item.attr_id">
                            <!-- 复选框组 -->
                            <el-checkbox-group v-model="item.attr_vals">
                                <el-checkbox border :label="cb" v-for="(cb, index) in item.attr_vals" :key="index"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品属性" name="2">
                        <el-form-item :label="item.attr_name" v-for="item in onlyTableData" :key="item.attr_id">
                            <el-input v-model="item.attr_vals"></el-input>
                        </el-form-item> 
                    </el-tab-pane>
                    <el-tab-pane label="商品图片" name="3">
                        <!-- 图片上传 action为图片上传到的后台api-->
                        <el-upload :action="uploadURL" :on-preview="handlePreview"
                        :on-remove="handleRemove" list-type="picture" :on-success="handleSuccess" :headers="headerObj">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-tab-pane>
                    <el-tab-pane label="商品内容" name="4">
                        <!-- 富文本编辑器 -->
                        <quill-editor v-model="addForm.goods_introduce"></quill-editor>
                        <el-button type="primary" class="btnadd" @click="add">添加商品</el-button>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
        </el-card>
        <!-- 图片预览 -->
        <el-dialog title="图片预览" :visible.sync="previewVisible" width="50%" >
            <img :src="previewPath" alt="" class="previewImg">
        </el-dialog>
    </div>
</template>
<script>
import _ from 'lodash'

export default {
    data() {
        return {
            activeIndex:'0',
            // 添加商品的表单数据对象
            addForm:{
                goods_name:'',
                goods_price:0,
                goods_weight:0,
                goods_number:0,
                // 商品和所属的分类数据
                goods_cat:[],
                // 图片的数组
                pics:[],
                // 商品的详情描述
                goods_introduce:'',
                // 
                attrs:[]
            },
            // 表单的验证规则
            addFormrules:{
                goods_name:[
                    { required: true, message: '请输入商品名称', trigger: 'blur' }
                ],
                goods_price:[
                    { required: true, message: '请输入商品价格', trigger: 'blur' }
                ],
                goods_weight:[
                    { required: true, message: '请输入商品重量', trigger: 'blur' }
                ],
                goods_number:[
                    { required: true, message: '请输入商品数量', trigger: 'blur' }
                ],
                goods_cat:[
                    { required: true, message: '请选择商品分类', trigger: 'blur' }
                ]
            },
            // 商品分类
            cateList:[],
            // 级联选择器的配置
            cateProps:{
                expandTrigger: 'hover',
                label:'cat_name',
                value:'cat_id',
                children:'children'
            },
            // 动态参数列表数组
            manyTableData:[],
            // 静态属性
            onlyTableData:[],
            // 图片上传的地址
            uploadURL:'http://127.0.0.1:8888/api/private/v1/upload',
            // 图片上传的请求头
            headerObj:{
                Authorization : window.sessionStorage.getItem('token')
            },
            previewPath:'',
            previewVisible:false
        }
    },
    created() {
        this.getCateList()
    },
    methods: {
        // 获取所有商品分类数据
        async getCateList(){
            const {data:res} = await this.$http.get(`categories`)   
            if(res.meta.status!==200) return this.$message.error('获取商品分类失败')
            this.cateList = res.data
        },
        // 级联选择器选中项变化
        handleChange(){
            if(this.addForm.goods_cat.length!==3){   
                this.addForm.goods_cat.length = []
            }        
        },
        // 标签切换
        beforeTabLeave(activeName,oldactiveName){
            if(oldactiveName ==='0' && this.addForm.goods_cat.length!==3){
                this.$message.error('请先选择商品分类')
                return false
            }
        },
        // 
        async tabClicked(){
            // console.log(this.activeIndex);
            if(this.activeIndex==='1'){
                const {data:res} = await this.$http.get(`categories/${this.cateId}/attributes`,{
                    params:{sel:'many'}
                })   
                if(res.meta.status!==200) return this.$message.error('获取动态参数列表失败')
                res.data.forEach(item =>{
                    item.attr_vals = item.attr_vals.length ===0 ?[]: item.attr_vals.split(' ')
                })
                this.manyTableData = res.data
            }else if(this.activeIndex==='2'){
                const {data:res} = await this.$http.get(`categories/${this.cateId}/attributes`,{
                    params:{sel:'only'}
                })   
                if(res.meta.status!==200) return this.$message.error('获取静态属性列表失败')
                this.onlyTableData = res.data
            }
        },
        // 处理图片预览效果
        handlePreview(file){
            this.previewPath = file.response.data.url
            this.previewVisible = true
        },
        // 处理移除图片的操作
        handleRemove(file){
            // 获取要删除的图片的临时路径，从PICS数组中找到这个图片的索引值，从中移除
            const filePath = file.response.data.tmp_path
            const i = this.addForm.pics.findIndex(x=>{
                x.pic === filePath
            })
            this.addForm.pics.splice(i,1)
            console.log(this.addForm);
        },
        //监听图片上传成功 
        handleSuccess(response){
            // 拼接得到一个图片信息对象，再push到数组中
            const picInfo = { pic:response.data.tmp_path }
            this.addForm.pics.push(picInfo)
        },
        // 添加商品
        async add(){
            this.$refs.addFormRef.validate(valid=>{
                if(!valid){
                    return this.$message.error('请填写必要的表单信息!')
                }
            })
            // 执行添加
            const form = _.cloneDeep(this.addForm)
            form.goods_cat = form.goods_cat.join(',')
            // 处理动态参数和静态属性
            this.manyTableData.forEach(item=>{
                const newInfo = {
                    attr_id:item.attr_id,
                    attr_value:item.attr_vals.join(' ')
                }
                this.addForm.attrs.push(newInfo)
            })
            this.onlyTableData.forEach(item=>{
                const newInfo = {
                    attr_id:item.attr_id,
                    attr_value:item.attr_vals
                }
                this.addForm.attrs.push(newInfo)
            })
            form.attrs = this.addForm.attrs
            // 发起请求添加商品，商品名称要是唯一的
            const {data:res} = await this.$http.post(`goods`,form)   
            console.log(res);
            console.log(form);
            // if(res.meta.status!==201 ||res.meta.status!==400) return this.$message.error('添加商品失败')
            this.$message.success('添加商品成功')
            this.$router.push('/goods')
        }
    },
    computed: {
        cateId(){
            if(this.addForm.goods_cat.length===3){
                return this.addForm.goods_cat[2]
            }
            return null
        }
    },
}
</script>
<style lang="less" scoped>
    .select{
        width: 250px;
    }
    .el-checkbox {
        margin: 0 10px 0 0!important;
    }
    .previewImg{
        width: 100%;
    }
    .btnadd{
        margin-top: 15px;
    }
</style>