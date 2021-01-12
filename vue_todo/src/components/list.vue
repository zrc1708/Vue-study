<template>
    <ul class="todo-main">
        <Item v-for="(todo,index) in todos" :key="todo.id" 
              :todo="todo" :index="index" :deleteTodo="deleteTodo" :updateTodo="updateTodo"></Item>
    </ul>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Item from './item.vue'

export default defineComponent({
    name:'List',
    components:{
        Item
    },
    props:['todos','deleteTodo','updateTodo']
})
</script>
<style scoped>
</style>