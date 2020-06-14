import React, { Component } from 'react'

export default class ShowNumber extends Component {
    render() {
        return (
            <div style={{border:'1px solid black',padding:20}}>
                <h2>ShowNumber组件</h2>
                <h1>{this.props.number}</h1>
            </div>
        )
    }
}
