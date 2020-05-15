import React from 'react'

// 评论项组件
export default function CommentItem(props){
    // jsx中书写样式可以省略px
    return <div style={{border:'1px solid gray',margin:'10px',paddingLeft:20}}>
        <h1 style={{fontSize:16,color:'purple'}}>评论人：{props.user}</h1>
        <h3 style={{fontSize:14,color:'red'}}>评论内容：{props.content}</h3>
    </div>
}