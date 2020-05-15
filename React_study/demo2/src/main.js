// js打包入口文件
import React from 'react'
import ReactDOM from 'react-dom'

// 导入评论列表样式（这种样式是全局的）
import './css/commentList.css'

import CommentList from './components/comment1/CommentList.jsx'

ReactDOM.render(<div>
    <CommentList></CommentList>
</div>,document.getElementById('app')) 