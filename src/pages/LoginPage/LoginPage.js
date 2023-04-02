import React from "react";
import "./LoginPage.scss";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="login-wrapper">
      <h1 className="login__heading">tuneTime.</h1>
      <form action="" className="login-form">
        <a
          href={`${process.env.REACT_APP_SERVER_URL}login`}
          className="login-form__sbmt"
        >
          Login with Spotify
        </a>
      </form>
    </div>
  );
};

export default LoginPage;
