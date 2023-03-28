import React from "react";
import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <div className="login-wrapper">
      <h1 className="login__heading">tuneTime.</h1>
      <form action="" className="login-form">
        <label htmlFor="username" className="login-form__label">
          Username
        </label>
        <input
          type="text"
          name="username"
          className="login-form__input"
          placeholder="Username"
        />
        <label htmlFor="password" className="login-form__label">
          Passsword
        </label>
        <input
          type="text"
          name="password"
          className="login-form__input"
          placeholder="Password"
        />
        <label htmlFor="confirmPassword" className="login-form__label">
          Confrim Passsword
        </label>
        <input
          type="text"
          name="confirmPassword"
          className="login-form__input"
          placeholder="Password"
        />

        <button type="submit" className="login-form__sbmt">
          Signup with Spotify
        </button>
      </form>
      <Link to="/" className="login-form__signup">
        Login
      </Link>
    </div>
  );
};

export default SignupPage;
