import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
          
          <button type="button" className="nav-mobile-btn">
            Logout
          </button>
        </div>

        <div className="nav-bar-large-container">
          
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                Add File
              </Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/records" className="nav-link">
                Records
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="nav-menu-mobile">
        <ul className="nav-menu-list-mobile">
          <li className="nav-menu-item-mobile">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>

          <li className="nav-menu-item-mobile">
            <Link to="/add-file" className="nav-link">
              Add File
            </Link>
          </li>
          <li className="nav-menu-item">
              <Link to="/records" className="nav-link">
                Records
              </Link>
            </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)