import React, { Component } from 'react'

export default class app extends Component {

    state ={
        count:0
    }

    render() {
        const {count} = this.state
        return (
            <div>
                <p>click {count} times</p>
                <select ref={select => this.select = select}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>&nbsp;
                <button onClick = {this.increment}>+</button>&nbsp;
                <button onClick = {this.decrement}>-</button>&nbsp;
                <button onClick = {this.incrementIfOdd}>increment if odd</button>&nbsp;
                <button onClick = {this.incrementAsync}>increment async</button>
            </div>
        )
    }

    increment=()=>{
        const number = this.select.value*1
        const count = this.state.count + number
        this.setState({count})
    }
    decrement=()=>{
        const number = this.select.value*1
        const count = this.state.count - number
        this.setState({count})
    }
    incrementIfOdd=()=>{
        const number = this.select.value*1
        let count = this.state.count
        if(count%2 === 1) 
            count = this.state.count + number
        this.setState({count})
    }
    incrementAsync=()=>{
        const number = this.select.value*1
        const count = this.state.count
        setTimeout(() => {
            this.setState({count:count+number})
        }, 1000);
    }
}