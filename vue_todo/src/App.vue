<template>
    <div class="todo-container">
        <Header :addTodo="addTodo"></Header> 
        <List :todos="todos" :deleteTodo="deleteTodo" :updateTodo="updateTodo"></List>
        <Footer :todos="todos" :checkAll="checkAll" :clearAllCompletedTodos="clearAllCompletedTodos"></Footer>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'

import Header from './components/header.vue'
import List from './components/list.vue'
import Footer from './components/footer.vue'
import { Todo } from './types/todo'
import {saveTodos,readTodos} from './utils/loaclStorage'

export default defineComponent({
    name:'App',
    components:{
        Header,
        List,
        Footer
    },
    setup(){
        const state = reactive<{todos: Todo[]}>({
            todos:[]
        })

        // 界面加载完毕后，读取数据
        onMounted(()=>{
            state.todos = readTodos()
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
        // 全选，全不选
        const checkAll = (isCompleted: boolean) => {
            state.todos.forEach(todo =>{
                todo.isCompleted = isCompleted
            })
        }
        // 清理所有选中
        const clearAllCompletedTodos = () => {
            state.todos = state.todos.filter(todo => !todo.isCompleted)
        }
        // 监听改变
        watch(()=>state.todos,(value)=>{
            // 保存到浏览器的缓存中
            saveTodos(value)
        },{
            deep:true
        })

        return {
            ...toRefs(state),
            addTodo,
            deleteTodo,
            updateTodo,
            checkAll,
            clearAllCompletedTodos
        }
    }
})
</script>
<style scoped>
</style>