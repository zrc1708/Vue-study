<template>
    <div>
        <div v-for="(content,index) of contents" :key="index">
            <div class="title">{{content.title}}</div>
            <div>{{content.created_at}}</div>
            <div>{{content.content}}</div>
            <div> 
                <span @click="like(content.id)">赞（{{content.like_count}}）</span>  
                回复（{{content.comment_count}}）<a href="">我要回复</a>
            </div>
        </div>

        <ul>
            <li @click="getdata(Math.max(1,page-1))" :class="{disabled:page==1}">《</li >

            <li v-for="(item, index) in pages" :key="index" :class="{'active':item==page}" @click="getdata(item)">
                {{item}}
            </li>

            <li @click="getdata(Math.min(1,page+1))" :class="{disabled:page==pages}">》</li >
        </ul>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                page: 1, //当前页
                prepage: 2, //每页显示的记录条数
                pages: 1, //总页数
                count: 0, //总技记录数
                contents: []
            }
        },
        created() {
            this.getdata()
        },
        methods: {
            getdata(p) {

                if(p== this.page) return

                this.page = p || this.page


                axios({
                    method: 'get',
                    url: 'http://127.0.0.1:8888',
                    params:{
                        page:this.page
                    }
                }).then(rs => {
                    if (!rs.code) {
                        this.count = rs.data.count
                        this.prepage = rs.data.prepage
                        this.pages = Math.ceil(this.count / this.prepage)
                        this.contents = rs.data.data
                    }
                })
            },
            like(id){
                // console.log(document.cookie)
                axios({
                    method:'post',
                    url:'http://127.0.0.1:8888/like',
                    data:{
                        contentid:id,
                        // uid:localStorage.getItem('uid')  //使用了cookie就没有必要再发送
                    },
                    withCredentials: true
                }).then(({data})=>{
                    // console.log(data)
                    if(!data.code){
                        this.contents.forEach(content => {
                            if(content.id==data.data.id){
                                content.like_count = data.data.like_count
                            }
                        });
                    }else{
                        alert(data.data)
                    }
                })
            }
        }
    }
</script>

<style>
    li {
        display: inline-block;
        width: 20px;
        list-style-type: none;
        margin-left: 10px;
        cursor: pointer;
    }

    .active {
        background-color: rgba(0, 153, 255, 0.685)
    }
    .disabled{
        color: #cccccc;
        cursor: not-allowed;   /* 禁止点击 */
        pointer-events:none
    }
</style>