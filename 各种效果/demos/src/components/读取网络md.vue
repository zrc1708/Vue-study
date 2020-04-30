<template>
    <div>
        <div id="md" v-html="html" v-highlight></div>
    </div>
</template>
<script>
import showdown from 'showdown';
// hljs.initHighlightingOnLoad();

export default {
    data(){
        return{
            html:''
        }
    },
    created() {
        this.getmd()
    },
    mounted() {
        let nico = document.querySelectorAll('pre')
        nico.forEach(item=>{
            item.classList.push('hljs')
        })
    },
    methods: {
        async getmd(){
            let converter = new showdown.Converter();
            let data = await this.$http.get('http://127.0.0.1:8877/static/test.md')
            this.html = converter.makeHtml(data.data);
            hljs.initHighlightingOnLoad();
        }
    },
    
}
</script>
<style lang="less" scoped>

</style>