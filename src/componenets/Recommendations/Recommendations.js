import React, { useEffect, useState } from "react";

import "./Recommendations.scss";

import img from "../../assets/icons/5870.jpg";
import "animate.css";

const Recommendations = () => {
  const [recommended, setRecommended] = useState(null);

  const sessionProfile = sessionStorage.getItem("sessionProfile");
  const user = JSON.parse(sessionProfile);

  useEffect(() => {}, []);

  return (
    <div className="recomm-wrapper">
      <h2 className="recomm__title">Discover New Tunes!</h2>

      <img src={img} alt="" className="recomm__img" />

      <p className="recomm__text">
        Our song sharing app just got even better! Introducing our new
        recommendation page, designed to help you discover new music that you'll
        love based on your recent posts. Our page uses your last 7 daily posts
        to curate a personalized list of songs and artists that match your
        current listening preferences. Click here to see your tailored list and
        start exploring new sounds today!
      </p>
      <button className="recomm__btn animate__animated animate__rubberBand animate__delay-2s">
        New Tunes
      </button>
    </div>
  );
};

export default Recommendations;
