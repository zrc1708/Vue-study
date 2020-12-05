// ./src/index.js
import axios from 'axios'
import createHeading from './heading.js'

import './index.css'

const heading = createHeading()

document.body.append(heading)

axios.get('http://127.0.0.1:9000/api/users/zrc1708').then(data => {
    console.log(data);
})

module.hot.accept('./heading', () => {
    // 当 ./heading.js 更新，自动执行此函数
    console.log('heading 更新了～～')
})