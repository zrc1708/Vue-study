import React from 'react'
import CommentItem from './CommentItem.jsx'

// 评论列表组件
export default class CommentList extends React.Component{
    constructor(props){
        super(props)
        // 定义当前评论列表组件的私有数据
        this.state={
            cmts: [
                { user: '张三', content: '哈哈，沙发' },
                { user: '张三2', content: '哈哈，板凳' },
                { user: '张三3', content: '哈哈，凉席' },
                { user: '张三4', content: '哈哈，砖头' },
                { user: '张三5', content: '哈哈，楼下山炮' }
              ]
        }
    }
    // 在 有状态组件中， render 函数是必须的，表示，渲染哪些 虚拟DOM元素并展示出来
    render(){
        // 循环评论列表的方式1，比较low
        // var arr = []
        // this.state.cmts.forEach(item=>{
        //     arr.push(<h1>{item.user}</h1>)
        // })
        // return <div>
        //     {arr}
        // </div>

        return <div>
            <h1 className="title">评论列表案例</h1>
            {this.state.cmts.map((item,index)=>{
                // return <CommentItem user={item.user} content={item.content} key={index}></CommentItem>
                return <CommentItem {...item} key={index}></CommentItem>
            })}
        </div>
    }
}
