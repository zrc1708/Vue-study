import React from 'react'

import styles from '../../css/movie_item.scss'

export default class MovieItem extends React.Component {
    render() {
        return <div className={styles.box}>
                <img src={this.props.images.small} alt="" className={styles.img}/>
                <h4>电影名称：{this.props.title}</h4>
                <h4>上映年份：{this.props.year}</h4>
                <h4>电影类型：{this.props.genres.join(',')}</h4>
            </div>
        
    }
}
