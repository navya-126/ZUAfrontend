import {withRouter} from 'react-router-dom'
import TodoContext from '../../context/PostContext'

import './index.css'

const RegisterAndLoginHeader = props => (
  <TodoContext.Consumer>
    {value => {
      const {onToggleSignUp, isSignUp} = value
      console.log(isSignUp)
      let route = null
      if (isSignUp === false) {
        route = '/register'
      } else {
        route = '/login'
      }

      const onSignInOrSignUpButton = () => {
        onToggleSignUp()
        props.history.replace(route)
      }
    
      return (
        <nav className="nav-account-header">
          <div className="nav-account-content">
            <p className="website-text">
              <img src="https://res.cloudinary.com/dzcpsxjuv/image/upload/v1724559243/gopi/our85itex5rsdka6q2i1.png" alt="ZUA"/>
            </p>
            <div className=''>
              <button className='signup-signin-button' type="button" onClick={onSignInOrSignUpButton}>
                Sign-in / Sign-up
              </button>
              <button className='join-now-button'>
                  Join Now
              </button>
            </div>
          </div>
        </nav>
      )
    }}
  </TodoContext.Consumer>
)

export default withRouter(RegisterAndLoginHeader)
