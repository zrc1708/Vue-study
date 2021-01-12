<template>
    <div class="todo-footer">
        <label>
            <input type="checkbox">
        </label>
        <span><span>已完成0</span>/全部2</span>
        <button>清除已完成</button>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name:'Footer',
})
</script>
<style scoped>
</style>