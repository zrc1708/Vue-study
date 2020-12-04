// ./webpack.config.js

const path = require('path')

module.exports = {
    mode:'none',
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'output')
    },
    module: {
        rules: [
            {
              test: /\.md$/,
              // 直接使用相对路径
              use: [
                'html-loader',
                './markdown-loader'
              ]
            }
          ]
    }
}