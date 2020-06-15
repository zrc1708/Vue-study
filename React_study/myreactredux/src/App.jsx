import React,{ Component } from 'react';
import NumberControl from './components/numberControl'
import ShowNumber from './components/showNumber'

import {connect} from 'react-redux'

class App extends Component{

    render(){
        return (
            <div>
                <span>num:{this.props.NumberRedux}</span>
                <NumberControl></NumberControl>
                <ShowNumber></ShowNumber>
            </div>
        )
    }
}

export default connect(
  state=>({NumberRedux:state.NumberRedux}),
  {}
)(App)