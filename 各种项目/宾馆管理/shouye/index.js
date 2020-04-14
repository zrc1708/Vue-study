new Vue({
    el: '#app',
    data: {
        nowTime: '',
    },
    methods: {
        timeFormate(timeStamp) {
            let year = new Date(timeStamp).getFullYear();
            let month = new Date(timeStamp).getMonth() + 1 < 10 ? "0" + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1;
            let date = new Date(timeStamp).getDate() < 10 ? "0" + new Date(timeStamp).getDate() : new Date(timeStamp).getDate();
            let hh = new Date(timeStamp).getHours() < 10 ? "0" + new Date(timeStamp).getHours() : new Date(timeStamp).getHours();
            let mm = new Date(timeStamp).getMinutes() < 10 ? "0" + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes();
            let second = new Date(timeStamp).getSeconds() < 10 ? "0" + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds();
            this.nowTime = year + "年" + month + "月" + date + "日" + " " + hh + ":" + mm + ":" + second;
        },
        // 定时器函数
        nowTimes() {
            this.timeFormate(new Date());
            setInterval(this.nowTimes, 1000); //
        },

    },
    // 挂载完成时
    mounted() {
        this.nowTimes();
        
    },
})
