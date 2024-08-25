import {withRouter} from 'react-router-dom'

import Cookie from 'js-cookie'

import './index.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const Header = props => {
  const onClickLogout = () => {
    Cookie.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }


  return (
    <nav className="nav-header">
      <div className="nav-content">
        <p className="website-txt"><img src="https://res.cloudinary.com/dzcpsxjuv/image/upload/v1724559243/gopi/our85itex5rsdka6q2i1.png" alt="ZUA"/></p>
        <ul className='nav-items-link'>
          <li className='nav-item'>
            <Link to="/" className="nav-link">
            Home
            </Link>
          </li>
          <li className='nav-item'>
            <Link to="/upload" className="nav-link">
            Upload
            </Link>
          </li>
          <li className='nav-item'>
          <button
          type="button"
          className="logout-desktop-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
        <button
          type="button"
          className="logout-mobile-btn"
          onClick={onClickLogout}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
            alt="logout icon"
            className="logout-icon"
          />
        </button>
          </li>
        </ul>
        
      </div>
    </nav>
  )
}
export default withRouter(Header)
