import './styles.css'
import { useEffect, useState, useCallback } from 'react';

import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export const Home = () => {
  
  const [posts, setPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [page, setPage] = useState([0])
  const [postsPerPage] = useState([10])
  const [searchValue, setSearchValue] = useState('')
  
  const noMorePosts = page + postsPerPage >= allPosts.length

  const filteredPosts = !!searchValue ?
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLocaleLowerCase())
    }) 
    : 
    posts

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts()

    setPosts(postsAndPhotos.slice(page, postsPerPage))
    setAllPosts(postsAndPhotos)
  }, [])
  
  useEffect(() => {
    handleLoadPosts(0, postsPerPage)
  }, [handleLoadPosts, postsPerPage])

  const loadMorePosts = () =>{
    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts)
  
    setPosts(posts)
    setPage(nextPage)
  }
  
  const handleInputChange = (event) => {
    const value = event.currentTarget.value

    setSearchValue(value)
  }
  
  return(
      
    <section className="container">
      <div className="search-container">
        {!!searchValue && (
            <h1>Search Value: {searchValue}</h1>
        )}
        <TextInput 
          inputValue={searchValue}
          actionFn={handleInputChange}
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
          onClick={loadMorePosts}
          disabled={noMorePosts}
        />
        )}
      </div>
    </section>
  );
}

//Duas Maneiras diferentes de fazer componentes: Class e Function
/* export class Home2 extends Component{
  
  //this.handlePClick = this.handlePClick.bind(this)     //FAZIA-SE ISSO ANTIGAMENTE, podemos omitir transformando as functions em arrow
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 6,
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
} */