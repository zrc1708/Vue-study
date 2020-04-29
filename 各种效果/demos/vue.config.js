module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'https://img.abcyun.co/api',//目标地址
                changeOrigin: true, //开启代理
                pathRewrite: {'^/api': '/'}    //这里重写路径
            }

        }
    }
}