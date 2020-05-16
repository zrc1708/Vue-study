import React from 'react'
import ReactTypes from 'prop-types'

export default class Counter extends React.Component{
    constructor(props){
        super(props)

        this.state ={
            msg:'ok',
            count:props.initcount //把外界的initcount赋值给count
        }
    }
    static defaultProps={
        initcount:0 //如果外界没有传这个值，那么就初始化为0
    }
    // 这是创建一个静态的propTypes对象，可以把外界传过来的属性，进行类型校验，V15之后要安装prop-types
    static propTypes={
        initcount:ReactTypes.number  
    }

    // 在组件即将挂载到页面上的时候执行，此时，组件尚未挂载到页面中
    // 此时，内存中的虚拟DOM没开始创建
    componentWillMount(){   //等同于Vue中的created
        // 此时，无法获取到 页面上的 任何元素！【在这个阶段中，不能去操作页面上的DOM元素】
        // console.log(this.state.msg)
        // this.myselfFunc()
    }

    // 当执行到 这个 生命周期函数的时候，即将要开始渲染内存中的 虚拟DOM了
    // 当这个函数执行完，内存中就有了一个 渲染好的虚拟DOM，但是，页面上尚未真正显示DOM元素；
    render(){
        // console.log(this.refs.h3&&this.refs.h3.innerHTML)
        return<div>
            <h1>这支Counter计数器组件</h1>
            <input type="button" value="+1" id="btn" onClick={this.increment}/>
            <hr/>
            <h3 id="myh3" ref="h3">当前的数量是：{this.state.count}</h3>
        </div>
    }

    // 当组件挂载到页面上之后，会进入这个生命周期函数，只要进入这个生命周期函数了，页面上，已经有可见的DOM元素了
    // 当组件执行完 componentDidMount 函数后，就进入到了 运行中的状态，所以，componentDidMount 是创建阶段的最后一个函数
    componentDidMount() {   //相当于 Vue 中的 mounted 
        // 在这个函数中，我们可以放心的去 操作 页面上你需要使用的 DOM 元素了；
        // 如果我们想操作DOM元素，最早，只能在 componentDidMount 中进行；
        
        // 不推荐
        // document.getElementById('btn').onclick = () => {
        //     this.setState({
        //         count: this.state.count + 1
        //     })
        // } 
    }

    // 从这里开始，就进入到了组件的运行中状态

    // 判断组件是否需要更新
    shouldComponentUpdate(nextProps, nextState) {
    // 1. 在 shouldComponentUpdate 中要求必须返回一个布尔值
    // 2. 在 shouldComponentUpdate 中，如果返回的值是 false，则 不会继续执行后续的生命周期函数，
    // 而是直接退回到了 运行中 的状态，此时有序 后续的 render 函数并没有被调用，因此，页面不会被更新，
    // 但是， 组件的 state 状态，却被修改了；
    // return false

    // 需求： 如果 state 中的 count 值是偶数，则 更新页面，如果 count 值 是奇数，则不更新页面，我们想要的页面效果：4，6，8，10，12....
    // 经过打印测试发现，在 shouldComponentUpdate 中，通过 this.state.count 拿到的值，是上一次的旧数据，并不是当前最新的；
        // console.log(this.state.count + ' ---- ' + nextState.count);
    // return this.state.count % 2 === 0 ? true : false
    // return nextState.count % 2 === 0 ? true : false
        return true
    }

    // 组件将要更新，此时尚未更新，在进入这个 生命周期函数的时候，内存中的虚拟DOM是旧的，页面上的 DOM 元素 也是旧的
    componentWillUpdate() {
    // 经过打印分析，得到，此时页面上的 DOM 节点，都是旧的，应该慎重操作，因为你可能操作的是旧DOM
    // console.log(document.getElementById('myh3').innerHTML)
    // console.log(this.refs.h3.innerHTML);
    }

    // 组件完成了更新，此时，state 中的数据、虚拟DOM、页面上的DOM，都是最新的，此时，你可以放心大胆的去操作页面了
    componentDidUpdate() {
        // console.log(this.refs.h3.innerHTML);
    }


    increment=()=>{
        this.setState({
            count: this.state.count + 1
        })
    }

    myselfFunc() {
        console.log('这是我自己定义的函数，和生命周期函数无关');
    }
}