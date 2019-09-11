function timeFormate(timeStamp) {
    let year = new Date(timeStamp).getFullYear();
    let month = new Date(timeStamp).getMonth() + 1 < 10 ? "0" + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1;
    let date = new Date(timeStamp).getDate() < 10 ? "0" + new Date(timeStamp).getDate() : new Date(timeStamp).getDate();
    let hh = new Date(timeStamp).getHours() < 10 ? "0" + new Date(timeStamp).getHours() : new Date(timeStamp).getHours();
    let mm = new Date(timeStamp).getMinutes() < 10 ? "0" + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes();
    let second = new Date(timeStamp).getSeconds() < 10 ? "0" + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds();
    let nowTime = year + "年" + month + "月" + date + "日" + " " + hh + ":" + mm + ":" + second;
    // console.log('nico')
    document.querySelector('.time').innerText=nowTime
}
setInterval("timeFormate(new Date())",300)

new Vue({
    el: '#app',
    data: {
        nowTime: '',
        zhigong_show:true,
        yonghu_show:false,
        ruzhu_show:false,
        guibin_show:false,       

    },
    methods: {
        click_zhigong:function(){
            this.zhigong_show=true;
            this.yonghu_show=false;
            this.ruzhu_show=false;
            this.guibin_show=false;
        },
        click_yonghu:function(){
            this.zhigong_show=false;
            this.yonghu_show=true;
            this.ruzhu_show=false;
            this.guibin_show=false;
        },
        click_ruzhu:function(){
            this.zhigong_show=false;
            this.yonghu_show=false;
            this.guibin_show=false;
            this.ruzhu_show=true;
        },
        click_guibin:function(){
            this.zhigong_show=false;
            this.yonghu_show=false;
            this.guibin_show=true;
            this.ruzhu_show=false;
        },
        
        
    },
    // 挂载完成时
    mounted() {
        
        
    },
    
})
