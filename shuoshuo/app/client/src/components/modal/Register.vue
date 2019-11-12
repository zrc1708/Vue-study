<template>
    <div v-show="s">
        {{title}}
        <button @click="close">关闭</button>
        <div>
            <slot></slot>
        </div>
        <div>
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props:['show','title'],
    data() {
        return {
            s:this.show
        }
    },
    watch: {
        show(){
            // console.log(this.show)
            this.s=  this.show
        }
    },
    methods: {
        close(){
            this.s= false
            this.$emit('close')
        }
    },
    
}
</script>