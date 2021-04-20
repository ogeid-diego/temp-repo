import './styles.css'

import { PostCard } from '../PostCard'
import { Component } from 'react'

export class Posts extends Component{
  render(){
    const { posts } = this.props
    
    return(  
      <div className="posts"> 
      {posts.map(post => (
        <PostCard
          key={post.id} 
          title={post.title} 
          body={post.body}
          id={post.id}
          cover={post.cover}
        />
      ))}   
      </div>
    )
  }
}