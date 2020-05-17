const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
// 导入文辞删除文件的插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const webpack = require('webpack')

module.exports = {
    mode: 'production', // 设置mode
    entry:{//配置入口节点
        app:path.join(__dirname,'./src/main.js'),
        vendors:['jquery']  //把要抽离的第三方包的名称放到这个数组中
    },
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'js/bundle.js'
    },
    plugins:[//插件
        new htmlWebpackPlugin({
            template:path.join(__dirname,'./src/index.html'),
            filename:'index.html',
            minify:{
                collapseWhitespace:true,//合并多余的空格
                removeComments:true, //移除注释
                removeAttributeQuotes:true, //移除属性上的双引号
            }
        }),
        new CleanWebpackPlugin(), //删除旧文件插件
        new UglifyJSPlugin(), //代码压缩插件
        new MiniCssExtractPlugin({ //抽离js中的css文件插件
            // 可以通过在名字前加路径，来决定打包后的文件存在的路径
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css',
        }),
        new OptimizeCssAssetsPlugin({ //压缩css
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
              preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
          })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "vendors",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use : [
                    {loader:MiniCssExtractPlugin.loader,
                        options:{
                            publicPath: '../'
                        }},
                    { loader: "css-loader" },
                ]
            },
            {
                test: /\.scss$/,
                use : [
                    {loader:MiniCssExtractPlugin.loader,
                        options:{
                            publicPath: '../'
                        }},
                    { loader: "css-loader" },
                    { loader: "sass-loader" }
                ]
            },
            // {test:/\.css$/,use:['style-loader','css-loader']},
            // {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
            {test:/\.(png|gif|bmp|jpg)$/,use:'url-loader?limit=5000&name=images/[hash:8]-[name].[ext]'},
            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},
        ]
    }
}