import React from "react"
import Facebook from "../src/Assets/facebook.svg"
import Instagram from "../src/Assets/instagram.svg"
import Twitter from '../src/Assets/twitter.svg'
import Youtube from '../src/Assets/youtube.svg'

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-icons">
                <a href="#facebook"><img src={Facebook} alt="facebook-icon" /></a>
                <a href="https://www.instagram.com/mag_daleneee/" target="_blank" rel="noreferrer" ><img src={Instagram} alt="instagram-icon"/></a>
                <a href="https://twitter.com/mag_daleneeee" target="_blank" rel="noreferrer" ><img src={Twitter} alt="twitter-icon" /></a>
                <a href="./youtube"><img src={Youtube} alt="youtube-icon" /></a>
            </div>
            <div className="footer-links">
                <p>Conditions of Use</p>
                <p>Privacy & Policy</p>
                <p>Press Room</p>
            </div>
            <p className="footer-p">© 2023 MovieBox by Udoka Marymagdalene Ineh</p>
        </div>
    )
}

export default Footer