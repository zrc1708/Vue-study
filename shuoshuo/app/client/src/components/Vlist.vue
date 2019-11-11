<template>
    <div>
        <div v-for="(content,index) of contents" :key="index">
            <div class="title">{{content.title}}</div>
            <div>{{content.created_at}}</div>
            <div>{{content.content}}</div>
            <div>赞（{{content.like_count}}） 回复（{{content.comment_count}}）<a href="">我要回复</a></div>
        </div>

        <ul>
            <li>《</li>

            <li v-for="(item, index) in pages" :key="index" :class="{'active':item==page}" @click="getdata(item)">
                {{item}}
            </li>

            <li>》</li>
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
                pages: 0, //总页数
                count: 0, //总技记录数
                contents: []
            }
        },
        created() {
            this.getdata()
        },
        methods: {
            getdata(p) {
                this.page = p || 1
                axios({
                    method: 'get',
                    url: 'http://127.0.0.1:8888',
                    params:{
                        page:this.page
                    }
                }).then(rs => {
                    if (!rs.code) {
                        this.count = rs.data.count,
                            this.pages = Math.ceil(this.count / this.prepage)
                        this.contents = rs.data.data
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
</style>