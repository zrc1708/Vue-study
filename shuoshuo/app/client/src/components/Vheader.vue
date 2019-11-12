<template>
    <div>
        <img src="../assets/img/4131241.png" alt="">
        <a href="#" @click.prevent="register">注册</a>
        <span>|</span>
        <a href="#" @click.prevent="login">登录</a>

        <modal :show="modelName=='register'" @close="modalclose" title="注册">

            <form action="">
                <p>用户名</p>
                <input type="text" v-model="regisster.username">
                <p>密码</p>
                <input type="text" v-model="regisster.password">
                <p>重复密码</p>
                <input type="text" v-model="regisster.repassword">
            </form>

            <template slot="footer">
                <button @click="registersubmit">注册</button>
                <button>取消</button>
                <a href="#">我有账号，立即登录</a>
            </template>
        </modal>
        
         <modal :show="modelName=='login'" @close="modalclose" title="登录">

            <form action="">
                <p>用户名</p>
                <input type="text" v-model="regisster.username">
                <p>密码</p>
                <input type="text" v-model="regisster.password">
                
            </form>

            <template slot="footer">
                <button @click="loginsubmit">登录</button>
                <button>取消</button>
                <a href="#">我有账号，立即登录</a>
            </template>
        </modal>

    </div>
</template>

<script>
import Modal from './modal/Register'
import axios from 'axios'

    export default {
        components:{
            Modal
        },
        data() {
            return {
                modelName:'',
                regisster:{
                    username:'',
                    password:'',
                    repassword:''
                },
                log:{
                    username:'',
                    password:''
                }
            }
        },

        methods: {
            register(){
                this.modelName='register'

            },
            login(){
                this.modelName='login'
            },
            modalclose(){
                this.modelName = ''
            },
            registersubmit(){
                // console.log(this.regisster)
                axios({
                    method:'post',
                    url:'http://127.0.0.1:8888/register',
                    data:this.regisster
                }).then((data)=>{
                    if(data.code){
                        alert(data.data)
                    }else{
                        this.modelName = 'login'
                    }
                })
            },
            loginsubmit(){
                 axios({
                    method:'post',
                    url:'http://127.0.0.1:8888/login',
                    data:this.log
                }).then((data)=>{
                    if(data.code){
                        alert(data.data)
                    }else{
                        this.modelName = 'register'
                    }
                })
            }
        },
    }
</script>