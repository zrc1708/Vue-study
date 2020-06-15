import React, { Component } from 'react'
import {connect} from 'react-redux'


class ShowNumber extends Component {
    render() {
        return (
            <div style={{border:'1px solid black',padding:20}}>
                <h2>Show组件</h2>
                <h1>redux中的num：{this.props.NumberRedux}</h1>
                <h1>redux中的weather：{this.props.WeatherRedux}</h1>
            </div>
        )
    }
}

export default connect(
    state=>({NumberRedux:state.NumberRedux,WeatherRedux:state.WeatherRedux}),
    {}
)(ShowNumber)