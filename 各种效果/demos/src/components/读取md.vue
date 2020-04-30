<template>
    <div>
        <my-markdown v-highlight></my-markdown>
    </div>
</template>
<script>
import myMarkdown from '../assets/移动web开发_flex布局.md'
hljs.initHighlightingOnLoad();

export default {
    data(){
        return{
        }
    },
    components: {
        myMarkdown
    }
    
}
</script>
<style lang="less" scoped>

</style>