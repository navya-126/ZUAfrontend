import { Component } from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Cookies from "js-cookie"
import PostItem from '../PostItem'
import Header from "../Header"
import './index.css'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
const ZUA_API=""

class  PostList extends Component {
  state = { isLoading: true, blogsData: [] }

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {


    const jwtToken=Cookies.get("jwt_token")
    const url=`${ZUA_API}/posts`
    const options={
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url,options)
    const data = await response.json()
    console.log(data)
    const formattedData = data.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      imageUrl: eachItem.image_url,
      avatarUrl: eachItem.avatar_url,
      author: eachItem.author,
      topic: eachItem.topic,
    }))
    this.setState({ blogsData: formattedData, isLoading: false })
  }

  render() {
    const { blogsData, isLoading } = this.state
    const jwtToken=Cookies.get("jwt_token")
    if (jwtToken===undefined){
        return <Redirect path="/login"/>
    }

    return (
      <>
      <Header/>
      
  
      <div className="blog-list-container">
        {isLoading ? (
          <div className='loading-container'>
           <Loader type="Oval" color="deepskyblue" height={100} width={100} />
           </div>
        ) : (
          <ul className='post-list-items'>
            {
              blogsData.map(item => <PostItem blogData={item} key={item.id} />)
            }
          </ul>
          
        )}
      </div>
      </>
    )
  }
}

export default PostList