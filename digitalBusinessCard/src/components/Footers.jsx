import React from 'react'
import facebookIcon from '../assets/facebook Icon.png'
import twitterIcon from '../assets/twitter Icon.png'
import instagramIcon from '../assets/instagram Icon.png'
import githubIcon from '../assets/github Icon.png'

export default function Footers() {
    return (
        <>
            <div className="footer-container">
                <img src={facebookIcon} alt="twitter-icon" className="icon--twitter" />
                <img src={twitterIcon} alt="facebook-icon" className="icon--facebook" />
                <img src={instagramIcon} alt="instagram-icon" className="icon--instagram" />
                <img src={githubIcon} alt="githuhb-icon" className="icon--github" />
            </div>
        </>
    )
}