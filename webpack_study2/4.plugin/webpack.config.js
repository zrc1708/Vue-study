// ./webpack.config.js

const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 自制去除输出文件的前面的注释的插件
const RemoveCommentsPlugin  = require('./remove-comments-plugin')

module.exports = {
    mode: 'none',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'output')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Webpack Plugin Sample',
            template: './src/index.html'
        }),
        // 如果项目不止一个html，就再生成一个
        new HtmlWebpackPlugin({
            filename: 'about.html'
        }),
        new CopyWebpackPlugin({
            patterns: ['public'] // 需要拷贝的目录或者路径通配符
        }),
        new RemoveCommentsPlugin()
    ]
}