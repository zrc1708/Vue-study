const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    mode: 'none',
    entry: './src/index.js',
    // devtool: 'cheap-module-eval-source-map',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'output')
    },
    optimization: {
        // 模块只导出被使用的成员
        usedExports: true,
        // 压缩输出结果
        // minimize: true,
        // 尽可能合并每一个模块到一个函数中
        // concatenateModules: true,
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env']
                ]
              }
            }
          }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Webpack',
            template: './src/index.html'
        }),
        // new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        open:true,
        // hot:true,
        port: 9000
    }
}