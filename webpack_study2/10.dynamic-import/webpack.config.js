const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js'
  },
  devtool: 'cheap-module-eval-source-map', // source map 设置
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Multi Entry',
      template: './src/index.html',
      filename: 'index.html'
    }),
  ],
  // optimization: {
  //   splitChunks: {
  //     // 自动提取所有公共模块到单独 bundle
  //     chunks: 'all'
  //   }
  // }
}
