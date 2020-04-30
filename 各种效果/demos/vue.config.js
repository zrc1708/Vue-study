module.exports = {
    devServer: {
        proxy: {
            '/imageapi': {
                target: 'https://img.abcyun.co/api',//目标地址
                changeOrigin: true, //开启代理
                pathRewrite: {'^/imageapi': '/'}    //这里重写路径
            }

        }
    },
    chainWebpack: config => {
        config.module.rule('md')
          .test(/\.md/)
          .use('vue-loader')
          .loader('vue-loader')
          .end()
          .use('vue-markdown-loader')
          .loader('vue-markdown-loader/lib/markdown-compiler')
          .options({
            raw: true
          })
    }
}