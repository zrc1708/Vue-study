<template>
    <div>
        <input type="file" accept="image/*" ref="file"/>
        <input type="submit" value="提交" @click="upload"/>
        <img :src="url" alt="">
    </div>
</template>
<script>
export default {
    data(){
        return{
            url:''
        }
    },
    methods: {
        upload(){
            let formData = new FormData();
            formData.append('image', this.$refs.file.files[0])
            formData.append('apiType', 'ali')
            formData.append('token', 'cd80a5ea93ddab33ded025aeff37')
            this.$http.post(`/imageapi/upload`, formData).then(res => {
                console.log(res.data.data.url.ali)
                this.url = res.data.data.url.ali
            })
        }
    },
}
</script>
<style lang="less" scoped>

</style>