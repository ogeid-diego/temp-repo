import { Component } from 'react'
import './styles.css'

export class PostCard extends Component{
    render(){
        const { title, cover, body, id } = this.props
        return(
            <div className="post">
                <img src={cover} alt={title}></img>
                <div className="post-content">
                    <h1> {title} {id}</h1>
                    <p>{body}</p>
                </div>
            </div>
        )
    }
}