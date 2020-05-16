import React from 'react'

// 样式优化3
// import inlineSryle from './cmtItemStyles.js'

// 导入评论项的样式文件，这种方式不是模块化的css
// import '../../css/commentItem.css'

import itemStyles from '../../css/commentItem.css'

// 评论项组件
export default function CommentItem(props){

    // 样式优化1
    // const boxStyle = {border:'1px solid gray',margin:'10px',paddingLeft:20}
    // const titleStyle = {fontSize:16,color:'purple'}
    // const bodyStyle = {fontSize:14,color:'red'}

    // 样式优化2
    // const inlineSryle={
    //     boxStyle : {border:'1px solid gray',margin:'10px',paddingLeft:20},
    //     titleStyle : {fontSize:16,color:'purple'},
    //     bodyStyle : {fontSize:14,color:'red'}
    // }


    // jsx中书写样式可以省略px
    // return <div style={inlineSryle.boxStyle}>
    //     <h1 style={inlineSryle.titleStyle}>评论人：{props.user}</h1>
    //     <h3 style={inlineSryle.bodyStyle}>评论内容：{props.content}</h3>
    // </div>


    return <div className={itemStyles.box}>
        <h1 className={itemStyles.title}>评论人：{props.user}</h1>
        <h3 className={itemStyles.body}>评论内容：{props.content}</h3>
    </div>
}