// ./markdown-loader.js

const marked = require('marked')

module.exports = source => {

  // 1. 将 markdown 转换为 html 字符串
  const html = marked(source)

  // 2. 将字符串交给下一个loader处理  
  return html

}
