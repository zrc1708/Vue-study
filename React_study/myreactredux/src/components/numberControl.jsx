import React, { Component } from 'react'

import {connect} from 'react-redux'
import {AddNum} from '../redux/actions'

class NumberControl extends Component {

    render() {
        return (
            <div style={{border:'1px solid black',padding:20}}>
                <h2>NumberControl组件</h2>
                <button onClick={this.props.add}>+1</button>
                <button onClick={this.props.reduce}>-1</button>
            </div>  
        )       
    }
}

export default connect(
    state=>({NumberRedux:state.NumberRedux}),
    {AddNum}
)(NumberControl)
