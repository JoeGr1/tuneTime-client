import React, { useState } from "react";

import "./Recommendations.scss";

import img from "../../assets/icons/5870.jpg";
import "animate.css";

import axios from "axios";
import RecommendedSong from "../RecommendedSong/RecommendedSong";

const Recommendations = () => {
  const [recommended, setRecommended] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const sessionProfile = sessionStorage.getItem("sessionProfile");
  const user = JSON.parse(sessionProfile);

  const getRecomm = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/get-recommended/${user.spotify_id}`
      );

      setRecommended(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async () => {
    try {
      getRecomm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="recomm-wrapper">
      <h2 className="recomm__title">Discover New Tunes!</h2>

      <img src={img} alt="Song sharing image" className="recomm__img" />

      <p className="recomm__text">
        Our song sharing app just got even better! Introducing our new
        recommendation page, designed to help you discover new music that you'll
        love based on your recent posts. Our page uses your last 7 daily posts
        to curate a personalized list of songs and artists that match your
        current listening preferences. Click here to see your tailored list and
        start exploring new sounds today!
      </p>
      {!recommended && (
        <button
          onClick={handleClick}
          className="recomm__btn animate__animated animate__rubberBand animate__delay-2s"
        >
          New Tunes
        </button>
      )}
      {recommended && <h3 className="recomm__subheading">Your Recommended</h3>}
      {!isLoading &&
        recommended &&
        recommended.map((song) => {
          return <RecommendedSong key={song.id} song={song} />;
        })}
    </div>
  );
};

export default Recommendations;
