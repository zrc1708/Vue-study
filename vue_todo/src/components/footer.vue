<template>
    <div class="todo-footer">
        <label>
            <input type="checkbox" v-model="isCheckAll">
        </label>
        <span><span>已完成{{count}}</span>/全部{{todos.length}}</span>
        <button @click="clearAllCompletedTodos">清除已完成</button>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import {Todo} from '../types/todo'
export default defineComponent({
    name:'Footer',
    props:{
        todos:{
            type:Array as () => Todo[],
            required:true
        },
        checkAll:{
            type:Function,
            requred:true
        },
        clearAllCompletedTodos:{
            type:Function,
            required:true
        }
    },
    setup(props){
        // 已完成
        const count = computed(()=>{
            return props.todos.reduce((pre,todo,index)=>pre+(todo.isCompleted?1:0),0)
        })

        // 全选、全不选
        const isCheckAll = computed({
            get(){
                return count.value>0&&props.todos.length===count.value
            },
            set(val){
                props.checkAll(val)
            }
        })

        return {
            count,
            isCheckAll
        }
    }
})
</script>
<style scoped>
</style>