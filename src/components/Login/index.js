import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errMsg: '',
    submitErr: false,
  }

  usernameHandler = ev => {
    this.setState({username: ev.target.value})
  }

  passwordHandler = ev => {
    this.setState({password: ev.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errMsg => {
    this.setState({
      submitErr: true,
      errMsg,
    })
  }

  onSubmitHandler = async ev => {
    ev.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errMsg, submitErr} = this.state
    return (
      <div className="login-container">
        <div className="login-form-section">
          <form onSubmit={this.onSubmitHandler} className="form">
            <div className="form-header">
              <img
                src="https://res.cloudinary.com/dq92tiimk/image/upload/v1734084313/Tasty-Kitchen-App/Icons/logo_od4ami.png"
                alt="webiste logo"
                className="logo"
              />
              <img
                src="https://res.cloudinary.com/dq92tiimk/image/upload/v1734084312/Tasty-Kitchen-App/Icons/tasty_kitchen_icon_uqjyvr.png"
                alt="website icon"
                className="icon"
              />
            </div>
            <h1 className="login-header">Login</h1>
            <div className="input-container">
              <div className="input-section">
                <label htmlFor="username" className="labels">
                  USERNAME
                </label>
                <input
                  value={username}
                  onChange={this.usernameHandler}
                  type="text"
                  className="inputs"
                  id="username"
                />
              </div>

              <div className="input-section">
                <label htmlFor="password" className="labels">
                  PASSWORD
                </label>
                <input
                  value={password}
                  onChange={this.passwordHandler}
                  type="password"
                  className="inputs"
                  id="password"
                />
              </div>
              <button type="submit" className="loginBtn">
                Login
              </button>
            </div>
            {submitErr && <p className="errMsg">{errMsg}</p>}
          </form>
        </div>
        <div className="img-section">
          <img
            src="https://res.cloudinary.com/dq92tiimk/image/upload/v1734084841/Tasty-Kitchen-App/Images/Rectangle_1456_1_rklfbd.png"
            alt="login banner"
            className="login-banner"
          />
        </div>
      </div>
    )
  }
}

export default Login
