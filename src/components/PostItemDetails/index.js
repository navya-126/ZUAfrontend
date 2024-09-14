import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Cookies from 'js-cookie'
import Header from "../Header"
import './index.css'



class PostItemDetails extends Component {

  state = {blogData:[], isLoading: true}
  componentDidMount() {
    this.getBlogItemDetails()
  }
  getBlogItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken=Cookies.get("jwt_token")
    const url=`${process.env.REACT_APP_API}/posts/${id}`
    const options={
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url,options)
    const data = await response.json()
    const updatedData = data.map(eachItem=>({
      author: eachItem.author,
      id: eachItem.id,
      avatarUrl: eachItem.avatar_url,
      content: eachItem.content,
      imageUrl: eachItem.image_url,
      title: eachItem.title,
      topic: eachItem.topic,

    })) 
      
    
    console.log(updatedData)
    this.setState({blogData: updatedData, isLoading: false})
  }

  onDeletePost=async ()=>{
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken=Cookies.get("jwt_token")
    const url=`${process.env.REACT_APP_API}/posts/${id}`
    const options={
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response=await fetch(url,options)
    const data= await response.json()
    console.log(data)
    if (response.ok){
      alert("Post deleted successfully")
      this.props.history.push('/')
    }
  }
  render() {
   
    

    const {isLoading,blogData} = this.state
    return (
      <>
    <Header/>
      <div className="blog-container">
        {isLoading ? (
          <div className="loader-container">
            <Loader type="Oval" color="deepskyblue" height={100} width={100} />
          </div>
        ) : (
          <ul>

          {
           blogData.map(eachItem=>(
             <div className="blog-info">
             <h2 className="blog-details-title">{eachItem.title}</h2>
     
             <div className="author-details">
               <img className="author-pic" src={eachItem.avatarUrl} alt={eachItem.author} />
               <p className="details-author-name">{eachItem.author}</p>
             </div>
     
             <img className="blog-image" src={eachItem.imageUrl} alt={eachItem.title} />
             <div className='bottom-container'>
             <p className="blog-content">{eachItem.content}</p>
             <button className='delete-button' onClick={this.onDeletePost}>
              <img src="https://img.icons8.com/material-outlined/24/trash--v1.png" alt="delete icon" className='delete-icon'/>
             </button>
             </div>
             
           </div>
           ))
          }
           </ul>
        )}
      </div>
      </>
    )
  }
}

export default PostItemDetails
