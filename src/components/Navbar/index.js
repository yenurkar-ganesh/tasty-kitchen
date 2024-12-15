import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Navbar = props => {
  const logoutHandler = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <ul className="navbar">
      <li className="nav-list">
        <img
          src="https://res.cloudinary.com/dq92tiimk/image/upload/v1734084313/Tasty-Kitchen-App/Icons/logo_od4ami.png"
          alt="website logo"
          className="logo"
        />
        <img
          src="https://res.cloudinary.com/dq92tiimk/image/upload/v1734084312/Tasty-Kitchen-App/Icons/tasty_kitchen_icon_uqjyvr.png"
          alt="website icon"
          className="icon"
        />
      </li>
      <div className="nav-link-section">
        <li className="nav-list">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-list">
          <Link className="nav-link" to="/cart">
            Cart
          </Link>
        </li>
        <li className="nav-list">
          <button className="logoutBtn" type="button" onClick={logoutHandler}>
            Logout
          </button>
        </li>
      </div>
    </ul>
  )
}

export default withRouter(Navbar)
