// 应用的根组件
import React, { Component } from 'react'
import { Button,message } from 'antd';
import 'antd/dist/antd.css';

export default class App extends Component {
    render() {
        return (
            <div>
                <Button type="primary" onClick={this.handleClidk}>Primary</Button>
            </div>
        )
    }
    handleClidk =()=>{
        message.success('成功了')
    }
}
 