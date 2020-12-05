// ./webpack.config.js

const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devtool: 'cheap-module-eval-source-map', // source map 设置
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
        // new CopyWebpackPlugin({
        //     patterns: ['public'] // 需要拷贝的目录或者路径通配符
        // })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        open:true,
        port: 9000,
        proxy: {
            '/api': {
                target: 'https://api.github.com',
                pathRewrite: {
                    '^/api': '' // 替换掉代理地址中的 /api
                },
                changeOrigin: true // 确保请求 GitHub 的主机名就是：api.github.com
            }
        }
    }
}