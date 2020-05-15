import React from 'react'

export default class Hello2 extends React.Component{
    constructor(props){
      super(props)
      // 如果想使用组件state上的数据，直接通过this.state访问
      this.state={
        msg:'这是Hello2组件的私有msg数据',
        info:'niconiconi'
      }
    }
    render(){
      return <div>
        <h1>使用class类创建的组件</h1>
        <h3>外接传递过来的数据：{this.props.address}</h3>
        <h5>{this.state.msg}</h5>
        <input type="button" value="修改msg" id ="btnChangeMsg" onClick={this.changeMsg}></input>
        <br />
      </div>
    }
    changeMsg=()=>{
      // this.setState支持传递function，function支持传递两个参数书
      // 第一个为修改之前的老state，第二个为外界传递给当前组件的props数据
      // this.setState是异步执行，如果要拿到最新的数据，最好在回调函数中操作
      this.setState(function(prevState,props){
        // console.log(prevState,props)
        return{
          msg:'123'
        }
      },function(){
        console.log(this.state.msg)
      })
    }
  }