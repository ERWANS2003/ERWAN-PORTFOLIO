import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import '../assets/styles/Footer.scss'

function Footer() {
  return (
    <footer>
      <div>
        <a href="https://github.com/ERWANS2003" target="_blank" rel="noreferrer"><GitHubIcon/></a>
      </div>
      <p>Portfolio de Oubda Wendnongdo Erwan &mdash; Développeur Web & Mobile 💜</p>
    </footer>
  );
}

export default Footer;