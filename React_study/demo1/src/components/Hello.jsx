import React from 'react'

function Hello(props){
    // 在组件中，如果想要使用外部传递过来的数据，必须，显示的在 构造函数参数列表中，定义 props 属性来接收；
    // 通过 props 得到的任何数据都是只读的，不能从新赋值
    return <div>
        <h1>这是在Hello组件中定义的元素 ---{props.address}</h1>
        <p id='hehehe'></p>
    </div>
}

export default Hello