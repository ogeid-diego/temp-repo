import './styles.css'
import { Component } from 'react';

import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

//Duas Maneiras diferentes de fazer componentes: Class e Function
export class Home extends Component{
  
  //this.handlePClick = this.handlePClick.bind(this)     //FAZIA-SE ISSO ANTIGAMENTE, podemos omitir transformando as functions em arrow
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: ''
  };

  componentDidMount(){
    this.loadPosts()
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state
    const postsAndPhotos = await loadPosts()
    this.setState({ 
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos 
    })
  }

  componentDidUpdate(){
    
  }

  componentWillUnmount(){
    
  }

  loadMorePosts = () =>{
    const { page, postsPerPage, allPosts, posts } = this.state
    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts)

    this.setState({posts, page: nextPage})
  }

  handleInputChange = (event) => {
    const value = event.currentTarget.value
    this.setState({ ...this.state, searchValue: value})
  }

  render(){
    //const name = this.state.name // assim, ou usando destructuring || const { name } = this.state
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state
    const noMorePosts = page + postsPerPage >= allPosts.length

    const filteredPosts = !!searchValue ?
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(searchValue.toLocaleLowerCase())
      }) 
      : 
      posts
    
    return(
      
      <section className="container">
        <div className="search-container">
          {!!searchValue && (
              <h1>Search Value: {searchValue}</h1>
          )}
          <TextInput 
            inputValue={searchValue}
            actionFn={this.handleInputChange}
          />
        </div>
        {filteredPosts.length > 0 &&(
          <Posts posts={filteredPosts}/>
        )}
        {filteredPosts.length === 0 &&(
          <p> There are no posts</p>
        )}
        <div className="button-container"> 
          {!searchValue && (
            <Button 
            text="Load More Posts"
            onClick={this.loadMorePosts}
            disabled={noMorePosts}
          />
          )}
        </div>
      </section>
    );
  }
}