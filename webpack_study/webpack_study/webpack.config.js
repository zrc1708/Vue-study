const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
//创建对象
const htmlPlugin = new HtmlWebpackPlugin({
    //设置生成预览页面的模板文件
    template:"./src/index.html",
    //设置生成的预览页面名称
    filename:"index.html"
})

const VueLoaderPlugin = require("vue-loader/lib/plugin");  
const vuePlugin = new VueLoaderPlugin();  

module.exports = {
    // 编译模式
    mode :'development',//development production
    entry:path.join(__dirname,'./src/index.js'),//打包入口
    output:{
        path:path.join(__dirname,'./dist/'),//输出文件的存放路径
        filename:'bundle.js'//输出文件的名称
    },
    plugins:[htmlPlugin,vuePlugin],
    module : {
        rules:[//test设置需要匹配的文件类型，支持正则 use表示该文件类型需要调用的loader loader从后往前调用
            {
                test:/\.css$/,
                use:['style-loader','css-loader','postcss-loader']
            },
            {
                test:/\.less$/,
                use:['style-loader','css-loader','less-loader']
            },
            {
                test:/\.scss$/,
                use:['style-loader','css-loader','sass-loader']
            },
            {
                test:/\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,
                //limit用来设置字节数，只有小于limit值的图片，才会转换
                //为base64图片
                use:"url-loader?limit=16940"
            },
            {
                test:/\.js$/,
                use:"babel-loader",
                //exclude为排除项，意思是不要处理node_modules中的js文件
                exclude:/node_modules/
            },
            { 
                test:/\.vue$/,
                loader:"vue-loader",
            }
        ]
    }
}
