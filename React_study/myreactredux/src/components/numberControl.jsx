import React, { Component } from 'react'

import {connect} from 'react-redux'
import {AddNum,ReduceNum,GetWea} from '../redux/actions'

class NumberControl extends Component {

    add=()=>{
        const num = this.props.NumberRedux
        this.props.AddNum(num)
    }
    reduce=()=>{
        const num = this.props.NumberRedux
        this.props.ReduceNum(num)
    }
    Wea=()=>{
        this.props.GetWea()
    }

    render() {
        return (
            <div style={{border:'1px solid black',padding:20}}>
                <h2>Control组件</h2>
                <p>{this.props.NumberRedux}</p>
                <button onClick={this.add}>+1</button>
                <button onClick={this.reduce}>-1</button>
                <br/>
                <button onClick={this.Wea}>获取天气</button>
            </div>  
        )       
    }
}

export default connect(
    state=>({NumberRedux:state.NumberRedux}),
    {AddNum,ReduceNum,GetWea}
)(NumberControl)
