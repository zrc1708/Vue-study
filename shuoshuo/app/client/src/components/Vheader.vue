<template>
    <div>
        <img src="../assets/img/4131241.png" alt="">

        <div v-if="userInfo.username">
            <a href="">{{userInfo.username}}</a>
            <span>|</span>
            <a href="#" @click.prevent="login">退出</a>
        </div>
        <div v-else>
            <a href="#" @click.prevent="register">注册</a>
            <span>|</span>
            <a href="#" @click.prevent="login">登录</a>
        </div>

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
                <input type="text" v-model="log.username">
                <p>密码</p>
                <input type="text" v-model="log.password">

            </form>

            <template slot="footer">
                <button @click="loginsubmit">登录</button>
                <button>取消</button>
            </template>
        </modal>

    </div>
</template>

<script>
    import Modal from './modal/Register'
    import axios from 'axios'

    export default {
        components: {
            Modal
        },
        data() {
            return {
                userInfo: {
                    id: 0,
                    username: ''
                },
                modelName: '',
                regisster: {
                    username: '',
                    password: '',
                    repassword: ''
                },
                log: {
                    username: '',
                    password: ''
                }
            }
        },
        created() {
            //   console.log(document.cookie)  
            //从cookie中获取用户信息


            let arr1 = document.cookie.split('; ')
            arr1 = arr1.map(item => {
                let arr2 = item.split('=')
                return {
                    [arr2[0]]: arr2[1]
                }
            })
            let cookie = Object.assign({}, ...arr1)


            this.userInfo = {
                // id: cookie.uid,
                username: cookie.username
            }
            console.log(this.userInfo)
        },
        methods: {
            register() {
                this.modelName = 'register'
            },
            login() {
                this.modelName = 'login'
            },
            modalclose() {
                this.modelName = ''
            },
            registersubmit() {
                // console.log(this.regisster)
                axios({
                    method: 'post',
                    url: 'http://127.0.0.1:8888/register',
                    data: this.regisster
                }).then((res) => {
                    if (res.data.code) {
                        alert(res.data.data)
                    } else {
                        this.modelName = 'login'
                    }
                })
            },
            loginsubmit() {
                axios({
                    method: 'post',
                    url: 'http://127.0.0.1:8888/login',
                    data: this.log,
                    withCredentials: true
                }).then((res) => {
                    if (res.data.code) {
                        alert(res.data.data)
                    } else {
                        this.modelName = ''
                        this.userInfo.id = res.data.data.id
                        this.userInfo.username = res.data.data.username

                        //把用户登录成功后的uid，保存在本地，方便浏览器去获取的位置
                        // localStorage.setItem('uid',this.userInfo.id)   //使用cookie就不需要使用这个来存储
                    }
                })
            }
        },
    }
</script>