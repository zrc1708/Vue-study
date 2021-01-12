<template>
    <li @mouseenter="mouseHandler(true)" @mouseleave="mouseHandler(false)"
        :style="{backgroundColor:myBgColor,color:myColor}">
        <label>
            <input type="checkbox" v-model="isCompleted">
            <span>{{todo.title}}</span>
        </label>
        <button v-show="isShow" @click="delTodo">删除</button>
    </li>
</template>
<script lang="ts">
import { computed, defineComponent, ref} from 'vue'
import { Todo } from '../types/todo'

export default defineComponent({
    name:'Item',
    props:{
        todo:{
            type:Object as () => Todo,
            required:true
        },
        deleteTodo:{
            type:Function,
            required:true
        },
        index:{
            type:Number,
            required:true
        },
        updateTodo:{
            type:Function,
            required:true
        }
    },
    setup(props){
        const myBgColor = ref('white')
        const myColor = ref('black')
        const isShow = ref(false)

        const mouseHandler = (flag: boolean) => {
            if(flag){
                // 鼠标进入
                myBgColor.value = '#409eff'
                myColor.value = 'white'
                isShow.value = true
            }else{
                // 鼠标离开
                myBgColor.value = 'white'
                myColor.value = 'black'
                isShow.value = false
            }
        }

        const delTodo = () => {
            if(window.confirm('确定要删除吗')){
                props.deleteTodo(props.index)
            }
        }

        // 设置复选框状态
        const isCompleted = computed({
            get(){
                return props.todo.isCompleted
            },
            set(val){
                props.updateTodo(props.todo ,val)
            }
        })

        return {
            mouseHandler,
            myBgColor,
            myColor,
            isShow,
            delTodo,
            isCompleted
        }
    }
})
</script>
<style scoped>
</style>