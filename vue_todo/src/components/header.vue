<template>
    <div class="rodo-header">
        <input type="text" placeholder="请输入你的任务，按回车确认" v-model="title"  @keyup.enter="add">
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
    name:'Header',
    props:{
        addTodo:{
            type:Function,
            required:true
        }
    },
    setup(props){
        const title = ref('')

        // 回车事件
        const add = () => {
            const text = title.value
            if(!text.trim()) return

            const todo = {
                id:Date.now(),
                title:text,
                isCompleted:false
            }
            
            props.addTodo(todo)
            title.value = ''
        }

        return {
            title,
            add
        }
    }
})
</script>
<style scoped>
</style>