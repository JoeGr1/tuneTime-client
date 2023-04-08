import React from "react";

import spotifyLogo from "../../assets/icons/Spotify_Logo_RGB_Green.png";

import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <h4 className="footer__text">Powered by</h4>
      <img
        src={spotifyLogo}
        alt="Spotify Logo"
        className="footer__spotify-logo"
      />
    </div>
  );
};

export default Footer;
