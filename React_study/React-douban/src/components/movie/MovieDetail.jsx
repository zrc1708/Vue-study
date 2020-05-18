import React, { Component } from 'react'

import { Button , Spin ,Alert} from 'antd';

import { ArrowLeftOutlined } from '@ant-design/icons';

import fetchJSONP from 'fetch-jsonp'

export default class MovieDetail extends Component {

    constructor(props){
        super(props)
        this.state = {
            info:{}, //电影信息对象
            isLoading:true
        }
    }

    componentWillMount(){
        fetchJSONP(`https://api.douban.com/v2/movie/subject/${this.props.match.params.id}?apikey=0df993c66c0c636e29ecbb5344252a4a`)
        .then(res=>res.json()).then(data =>{
            this.setState({
                info:data,
                isLoading:false
            })
        })
    }

    render() {
        return (
            <div>
                <Button type="primary" icon={<ArrowLeftOutlined />} onClick={this.goBack}>返回电影列表页面</Button>
                {this.renderInfo()}
            </div>
        )
    }

    goBack = () =>{
        this.props.history.go(-1)
    }
    renderInfo =()=>{
        if(this.state.isLoading){
            return <Spin tip="Loading...">
                    <Alert
                    message="正在获取电影列表"
                    description="精彩内容，马上呈现..."
                    type="info"/>
                </Spin>
        }else{
            return <div>
                <div style={{textAlign:'center'}}>
                    <h1>{this.state.info.title}</h1>
                    <img src={this.state.info.images.large} alt=""/>
                </div>
                <p style={{textIndent:'2em',lineHeight:'30px'}}>{this.state.info.summary}</p>
            </div>
        }
    }
}
