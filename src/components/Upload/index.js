

import {useState} from'react';
import Cookies from "js-cookie"
import Header from "../Header"
import "./index.css"





const Upload=()=>{
   
    const [topic,setTopic]=useState("")
    const [title,setTitle]=useState("")
    const [content,setContent]=useState("")
    const [author,setAuthor]=useState("")
    const [profileUrl,setProfileUrl]=useState("")
    const [imageUrl,setImageUrl]=useState("")
    const [isTrue,setTrue]=useState(false)
    const [error,setError]=useState("")
    


    const onChangeTopic=(event)=>{
        setTopic(event.target.value)
    }
    const onChangeTitle=(event)=>{
            setTitle(event.target.value)
    }
    const onChangeContent=(event)=>{
        setContent(event.target.value)
    }

    const onChangeAuthor=(event)=>{
        setAuthor(event.target.value)
    }

    const onchangeProfileurl=(event)=>{
        setProfileUrl(event.target.value)
    }

    const onChangeImageUrl=(event)=>{
        setImageUrl(event.target.value)
    }


  /*if (topic===""){
            setError("Please Enter Topic")
            return 

        }else if (title===""){
            setError("Please Enter Title")
            return 
        }
        else if (content===""){
            setError("Please Enter Content")
            return
        }
        else if (author===""){
            setError("Please Enter Author")
            return
        }
        else if (profileUrl===""){
            setError("Please Enter Avatar Url")
            return
        }
        else{
            setError("Please Enter Image Url")
            return
        }
*/

    




    const uploadFile=async (event)=>{
        event.preventDefault()
        console.log(topic,title,content,profileUrl,imageUrl)
        const jwtToken=Cookies.get("jwt_token")
        const url=`${process.env.REACT_APP_API}/posts` 
        const options={
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
            body: JSON.stringify({
              
                title,
                imageUrl,
                avatarUrl:profileUrl,
                author,
                topic,
                content
            }),
        }

        const response=await fetch(url,options)
        const data=await response.json()
        console.log(data)
        if(response.ok){
            setTrue(true)
            setError(data.message)
        }

        setTopic("")
        setTitle("")
        setAuthor("")
        setContent("")
        setImageUrl("")
        setProfileUrl("")


        
        
        


    }

    return(
        <>
        <Header/>
     
        <div className='upload-container'>

     
        <form className='form-container' onSubmit={uploadFile}>
            <div className='container-text'>
            <label className='label-text' htmlFor='topic'>TOPIC</label>
            <input className="input-text" id="topic" type="text" value={topic} placeholder="Enter a Topic" onChange={onChangeTopic} />
            </div>
            <div className='container-text'>
            <label className='label-text' htmlFor='title'>TITLE</label>
            <input className="input-text" id="title" type="text" value={title} placeholder="Enter a Title of Post" onChange={onChangeTitle} />
            </div>
            <div className='container-text'>
            <label className='label-text' htmlFor='content'>CONTENT</label>
            <textarea className="input-text" id="content" rows="3" cols="6" value={content} placeholder='Enter the Content' onChange={onChangeContent}></textarea>
        </div>
            <div className='container-text'>
            <label className='label-text' htmlFor='author'>AUTHOR</label>
            <input className="input-text" id="author" type="text"  value={author} placeholder="Enter Author's Name" onChange={onChangeAuthor} /> 
            </div>
            <div className='container-text'>
            <label className='label-text' htmlFor='profileUrl '>PROFILE URL</label>
            <input className="input-text" id="profileUrl" type="text"  onChange={onchangeProfileurl}/>
            </div>
            
            <div className='container-text'>
            <label  className='label-text' htmlFor='imageUrl'>IMAGE URL</label>
            <input className="input-text" id="imageUrl" type="text"  onChange={onChangeImageUrl} />
          </div>
            <button type="submit" className='submit-button'>Upload</button>
            {isTrue && <p className='msg'>{error}</p>}
        </form>
        </div>
        </>
    )
}
export default Upload