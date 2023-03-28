import React from "react";
import "./LoginPage.scss";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="login-wrapper">
      <h1 className="login__heading">tuneTime.</h1>
      <form action="" className="login-form">
        <label htmlFor="username" className="login-form__label">
          Username
        </label>
        <input
          name="username"
          type="text"
          className="login-form__input"
          placeholder="Username"
        />
        <button type="submit" className="login-form__sbmt">
          Login with Spotify
        </button>
      </form>
      <Link
        to="/signup"
        className="login-form__signup
      "
      >
        Signup
      </Link>
    </div>
  );
};

export default LoginPage;
