<template>
    
        <div>
            <div class="title">有哪些是受用一生的技能</div>
            <div>2018/4/9</div>
            <div>有什么事受用一生的技能呢？只要不是太繁琐或者是冷门知识，任何日常的小贴士，生活小窍门都可以。</div>
            <div>赞（100） 回复（66）<a href="">我要回复</a></div>
        </div>
    
</template>

<script>
import axios from 'axios'
    export default {
        data() {
            return {
                
            }
        },
        created() {
            axios({
                method:'get',
                url:'http://127.0.0.1:8888'
            })
        },
    }
</script>