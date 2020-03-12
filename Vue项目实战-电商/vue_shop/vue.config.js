module.exports = {
    lintOnSave: false,
    //=>直接去修改内置的webpack配置项
//   chainWebpack: config => {
//     //=>config:原始配置信息对象
//     config.module
//         .assetsPublicPath='./'
// },
    // 基本路径
    // baseUrl: process.env.NODE_ENV === 'production' ?'./' :'./',
    runtimeCompiler: true,
  publicPath: './',  //输出的根路径  默认是/ 如果你的网站是app.com/vue 这更改此配置项
  devServer: {
    port: 8888 //端口
  }
}