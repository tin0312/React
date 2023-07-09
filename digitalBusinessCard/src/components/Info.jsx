import React from "react";
import picture from "../assets/profilePic.jpeg";
import emailIcon from "../assets/email.png";
import linkedinIcon from "../assets/linkedin.png";
export default function Info() {
  return (
    <>
      <div className="info-container">
        <img src={picture} alt="profile picture" className = "info--picture" />
        <h1 className="info--name">Hoang Nhat Truong</h1>
        <h2 className = "info--role">Frontend Developer</h2>
        <p className = "info--website">hoangnhattruong.website</p>

        <div className="button-container">
          <button className="button--email"><img  src = {emailIcon}alt = "email-icon"/>Email</button>
          <button className="button--linkedin"><img src = {linkedinIcon} alt = "linkedin-icon" />LinkedIn</button>
        </div>
      </div>
    </>
  );
}
