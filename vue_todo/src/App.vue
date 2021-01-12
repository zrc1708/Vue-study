<template>
    <div class="todo-container">
        <Header :addTodo="addTodo"></Header> 
        <List :todos="todos" :deleteTodo="deleteTodo" :updateTodo="updateTodo"></List>
        <Footer></Footer>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

import Header from './components/header.vue'
import List from './components/list.vue'
import Footer from './components/footer.vue'
import { Todo } from './types/todo'


export default defineComponent({
    name:'App',
    components:{
        Header,
        List,
        Footer
    },
    setup(){
        const state = reactive<{todos: Todo[]}>({
            todos:[
                {id:1,title:'睡觉',isCompleted:false},
                {id:2,title:'吃饭',isCompleted:true},
                {id:3,title:'奥利给',isCompleted:false},
            ]
        })

        // 添加数据
        const addTodo = (todo: Todo) => {
            state.todos.unshift(todo)
        }
        // 删除数据
        const deleteTodo = (index: number) => {
            state.todos.splice(index, 1)
        }
        // 改变任务状态
        const updateTodo = (todo: Todo, isCompleted: boolean) => {
            todo.isCompleted = isCompleted
        }

        return {
            ...toRefs(state),
            addTodo,
            deleteTodo,
            updateTodo
        }
    }
})
</script>
<style scoped>
</style>