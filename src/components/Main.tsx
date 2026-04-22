import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Main.scss';
import avatar from '../assets/images/avatar_erwan.png';

function Main() {

  return (
    <div className="container">
      <div className="about-section">
        <div className="image-wrapper">
          <img src={avatar} alt="Avatar" />
        </div>
        <div className="content">
          <div className="social_icons">
            <a href="https://github.com/ERWANS2003" target="_blank" rel="noreferrer"><GitHubIcon/></a>
          </div>
          <h1>Oubda Wendnongdo Erwan</h1>
          <p>Développeur Web & Mobile</p>

          <div className="mobile_social_icons">
            <a href="https://github.com/ERWANS2003" target="_blank" rel="noreferrer"><GitHubIcon/></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;