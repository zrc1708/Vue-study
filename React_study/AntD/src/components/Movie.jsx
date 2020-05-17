import React from 'react'

export default class Movie extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            routeParams:props.match.params
        }
    }
    render(){
        // 从路由规则中提取匹配到的参数
        return <div>
            {/* Movie--{this.props.match.params.type}--{this.props.match.params.id} */}
            Movie--{this.state.routeParams.type}--{this.state.routeParams.id}
        </div>
    }
}
