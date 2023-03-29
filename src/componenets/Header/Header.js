import React from "react";
import { Link, NavLink } from "react-router-dom";

import "./Header.scss";

const Header = () => {
  return (
    <div className="header-wrapper">
      <Link to="/feed" className="nav__logo">
        tuneTime.
      </Link>
      <ul className="nav__list">
        <Link className="nav__item-link" to="/profile">
          <li className="nav__item">Profile.</li>
        </Link>
        <Link className="nav__item-link" to="/discover">
          <li className="nav__item">Discover.</li>
        </Link>
        <Link className="nav__item-link" to="/events">
          <li className="nav__item">Events.</li>
        </Link>
      </ul>
    </div>
  );
};

export default Header;
