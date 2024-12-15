import {Component} from 'react'
import './index.css'

export default function Footer() {
  return (
    <ul className="footer-container">
      <div className="footer-header">
        <img
          src="https://res.cloudinary.com/dq92tiimk/image/upload/v1734172745/Tasty-Kitchen-App/Icons/Frame_275_borudd.png"
          alt="webiste logo"
          className="logo"
        />
        <img
          src="https://res.cloudinary.com/dq92tiimk/image/upload/v1734172746/Tasty-Kitchen-App/Icons/Features_xwee11.png"
          alt="website icon"
          className="icon"
        />
      </div>
      <p>
        The only thing we are serious about is food. <br />
        Contact us on
      </p>
      <div className="social-media-container">
        <li className="footer-list">
          <img
            className="footer-icon"
            src="https://res.cloudinary.com/dq92tiimk/image/upload/v1734172464/Tasty-Kitchen-App/Icons/Frame_12_z7e2rf.png"
            alt="pintrest"
          />
        </li>
        <li className="footer-list">
          <img
            className="footer-icon"
            src="https://res.cloudinary.com/dq92tiimk/image/upload/v1734172464/Tasty-Kitchen-App/Icons/Frame_10_jvicca.png"
            alt="instagram"
          />
        </li>
        <li className="footer-list">
          <img
            className="footer-icon"
            src="https://res.cloudinary.com/dq92tiimk/image/upload/v1734172465/Tasty-Kitchen-App/Icons/Frame_11_jiqrff.png"
            alt="twitter"
          />
        </li>
        <li className="footer-list">
          <img
            className="footer-icon"
            src="https://res.cloudinary.com/dq92tiimk/image/upload/v1734172467/Tasty-Kitchen-App/Icons/Frame_13_kwpzdm.png"
            alt="facebook"
          />
        </li>
      </div>
    </ul>
  )
}
