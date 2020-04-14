module.exports = {
    //配置cli的内置服务器
    devServer: {
        proxy: {
            //当前监听的请求URL，当我们请求的地址以此开头，就会帮我们把请求转发到target设置的URL
          '/api': {
            //指向目标服务器
            target: 'http://localhost:8888/',
            pathRewrite:{
                "^/api":''
            }
          }
      }
    
        // proxy: 'http://localhost:8888'
      
    }
}