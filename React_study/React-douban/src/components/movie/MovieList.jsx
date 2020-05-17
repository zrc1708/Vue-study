import React from 'react'

import fetchJSONP from 'fetch-jsonp'

// 电影框
import MovieItem from './MovieItem.jsx'

// 导入UI组件
import { Spin, Alert } from 'antd';

export default class MovieList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            movies:[], //电影列表
            nowPage:parseInt(props.match.params.page) || 1, //当前展示第几页的数据
            pageSze:14, //每页展示多少条数据
            total:0, //当前电影总共有多少条数据
            isloading:true, //数据是否正在加载
            movieType:props.match.params.type,  //要获取的电影类型
        }
    }

    componentWillMount(){
        this.laodMovieListByTypesAndPage()
    }

    render() {
        return (
            <div>
                {this.renderList()}
            </div>
        )
    }

    // 根据电影类型和页码获取数据
    laodMovieListByTypesAndPage=()=>{
        // 使用fetch,第一个.then获取不到数据，拿到的只是response对象 
        // const start = this.state.pageSze * (this.state.nowPage -1)
        // const url = `https://api.douban.com/v2/movie/${this.state.movieType}?start=${start}&count=${this.state.pageSze}&apikey=0df993c66c0c636e29ecbb5344252a4a`
        // fetchJSONP(url).then(res=>res.json()).then(data=>{
        //     console.log(data)
        //     this.setState({
        //         isloading:false, //将loading隐藏
        //         movies:data.subjects, //为电影列表重新赋值
        //         total:data.total  //保存总条数
        //     })
        // })
        const data = require('../test_data/in_theaters.json')
        console.log(data)
        setTimeout(() => {
            this.setState({
                isloading:false, //将loading隐藏
                movies:data.subjects, //为电影列表重新赋值
                total:data.total  //保存总条数
            })
        }, 1000);
    }

    // 渲染电影列表
    renderList = ()=>{
        if(this.state.isloading){ //正在加载中
            return <Spin tip="Loading...">
                <Alert
                message="正在获取电影列表"
                description="精彩内容，马上呈现...status-danger"
                type="info"/>
            </Spin>
        }else{
            // 加载完成
            return <div style={{display:'flex',flexWrap:'wrap'}}>
                {this.state.movies.map((item,index)=>{
                    return <MovieItem {...item} key={item.id}></MovieItem>
                })}
            </div>
        }
    }
}
