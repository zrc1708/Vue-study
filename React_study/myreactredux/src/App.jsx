import React,{ Component } from 'react';
import NumberControl from './components/numberControl'
import ShowNumber from './components/showNumber'

import {connect} from 'react-redux'
import {AddNum} from './redux/actions'

class App extends Component{

    state = {
        number:0
    }

    add =()=>{
        this.setState({
            number:++this.state.number
        })
    }
    reduce =()=>{
        this.setState({
            number:--this.state.number
        })
    }

    render(){
      console.log(this.props)
        return (
            <div>
                <span>num:{this.props.NumberRedux}</span>
                <NumberControl add={this.add} reduce={this.reduce}></NumberControl>
                <ShowNumber number={this.state.number}></ShowNumber>
            </div>
        )
    }
}

export default connect(
  state=>({NumberRedux:state.NumberRedux}),
  {AddNum}
)(App)