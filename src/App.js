
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PostContent from "./context/PostContext"
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"
import PostList from './components/PostList'
import PostItemDetails from './components/PostItemDetails'
import Upload from './components/Upload'
import NotFound from './components/NotFound'

import './App.css'
import { Component } from 'react'


class App extends Component {
  state={isSignUp:false}


  onToggleSignUp=()=>{
    this.setState(prevState=>({isSignUp:!prevState.isSignUp}))
  }


  render(){
    const {isSignUp}=this.state
    return (
      <>

      
<PostContent.Provider value={{isSignUp,onToggleSignUp:this.onToggleSignUp}}>
<BrowserRouter>
    <Switch>
      <Route path="/login" component={LoginForm}/>
      <Route path="/register" component={RegisterForm}/>      
      <Route exact path="/" component={PostList} />
      <Route exact path="/blogs/:id" component={PostItemDetails} />
      <Route path="/upload" component={Upload} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
    
     </PostContent.Provider> 
 
      
      </>

    )
  }
  
}
  

  


export default App 
