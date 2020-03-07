<template>
    <div class="login_container">
        <div class="login_box">
             <!-- 头像区域 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <!-- 登录表单区域 -->
            <el-form  ref="LoginFormRef" :model="loginForm" :rules="LoginFormRules" label-width="0px" class="login_form">
                <!-- 用户名 -->
                <el-form-item label="" prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item label="" prop="password">
                    <el-input v-model="loginForm.password" type="password" prefix-icon="iconfont icon-3702mima"></el-input>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item label="" class="btns">
                    <el-button type="primary" @click = "login">登录</el-button>
                    <el-button type="info" @click = "resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 登录表单的数据绑定对象
            loginForm: {
                username:"admin",
                password:"123456"
                },
            //表单验证规则对象
            LoginFormRules: {
                username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                password:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
    methods: {
        //  重置按钮
        resetLoginForm(){
            this.$refs.LoginFormRef.resetFields()
        },
        // 登录
        login(){
            this.$refs.LoginFormRef.validate(async (valid)=>{
                if(!valid) return
                const {data:res} = await this.$http.post('login',this.loginForm)
                // console.log(res)
                if(res.meta.status !== 200) return this.$message.error('登录失败')
                this.$message.success('登录成功')
                // 将登录成功之后的token，保存到客户端的sessionStorage中
                // 项目中的其他接口，登录之后才能访问
                // token只应在当前网站打开期间生效，所以保存在sessionStorage
                window.sessionStorage.setItem('token',res.data.token)
                // 通过编程式导航跳转到后台主页
                this.$router.push('/home')
            })
        }
    },
} 
</script>

<style lang="less" scoped>
    .login_container{
        background-color: #2b4b6b;
        height: 100%;

        .login_box{
            width: 450px;
            height: 300px;
            background-color: #fff;
            border-radius: 3px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            .avatar_box{
                height: 130px;
                width:130px;
                border: 1px solid #eee;
                border-radius: 50%;
                padding: 10px;
                box-shadow: 0 0 10px #eee;
                position: absolute;
                left: 50%;
                transform: translate(-50%,-50%);
                background-color: #fff;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background-color: #eee;
                }
            }
            .login_form{
                position: absolute;
                bottom: 0;
                width: 100%;
                box-sizing: border-box;
                padding: 0 20px;
                .btns{
                    display: flex;
                    justify-content: flex-end;
                }
            }
            
        }

    }
</style>
