const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry:path.join(__dirname,'./src/main.js'),
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'bundle.js'
    },
    plugins:[//插件
        new htmlWebpackPlugin({
            template:path.join(__dirname,'./src/index.html'),
            filename:'index.html'
        })
    ],
    module:{
        rules:[
            {test:/\.css$/,use:[
                {loader: "style-loader"}, 
                {loader: "css-loader"}
            ]},
            {test:/\.scss$/,use:[
                {loader: "style-loader"}, 
                {loader: "css-loader",
                    options: {
                    modules: {
                        localIdentName: "[name]-[local]-[hash:5]"
                    }
                }}, 'sass-loader']},
            {test:/\.(png|gif|bmp|jpg)$/,use:'url-loader?limit=5000'},
            {test:/\.(jsx|js)$/,use:'babel-loader',exclude:/node_modules/},
        ]
    }
}