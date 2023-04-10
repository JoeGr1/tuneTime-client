import React, { useEffect, useState } from "react";
import axios from "axios";

import "./MyPost.scss";
import "../FeedPost/FeedPost.scss";

import notLiked from "../../assets/icons/heart.svg";
import liked from "../../assets/icons/heartFill2.svg";
import {
  DOES_USER_LIKE_POST,
  POST_LIKE_TO_POST,
  POST_UNLIKE_TO_POST,
} from "../../utils/apiCalls";

import spotifyLogo from "../../assets/icons/Spotify_Logo_RGB_Green.png";

const MyPost = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [likes, setLikes] = useState(post.likes);

  const sessionProfile = sessionStorage.getItem("sessionProfile");
  const user = JSON.parse(sessionProfile);

  useEffect(() => {
    if (isLiked) {
      setIsLoading(false);
    }
  }, [isLiked]);

  useEffect(() => {
    try {
      const doesUserLikePost = async () => {
        const response = await DOES_USER_LIKE_POST(post.id, user.spotify_id);
        setIsLiked(response.data.liked);
      };
      doesUserLikePost();
    } catch (error) {}
  }, []);

  const handleLike = async () => {
    const likeUpdate = {
      spotify_id: user.spotify_id,
    };

    try {
      const response = await POST_LIKE_TO_POST(post.id, likeUpdate);
    } catch (error) {
      console.log(error);
    }

    setLikes(likes + 1);
    setIsLiked(!isLiked);
  };

  const handleUnlike = async () => {
    const likeUpdate = {
      spotify_id: user.spotify_id,
    };

    try {
      const response = await POST_UNLIKE_TO_POST(post.id, likeUpdate);
    } catch (error) {
      console.log(error);
    }

    setLikes(likes - 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post-wrapper">
      <div className="post__content">
        <img
          src={post.album_cover}
          alt="albumcover"
          className="post__album-cover"
        />
        <div className="post__text-wrapper">
          <h2 className="post__songname">{post.song_name}</h2>
          <div className="post__song-details">
            <p className="post__artist">{post.artist_name}</p>
            <p className="post__album">{post.album_name}</p>
          </div>
          <p className="post__song-duration">{post.song_duration}</p>
        </div>
      </div>
      <div className="post__likes-wrapper">
        {isLiked && (
          <button className="post__btn" onClick={handleUnlike}>
            <img src={liked} alt="Like Icon" className="post__like-icon" />
          </button>
        )}
        {!isLiked && (
          <button className="post__btn" onClick={handleLike}>
            <img src={notLiked} alt="Like Icon" className="post__like-icon" />
          </button>
        )}
        <p className="post__likes">
          {Number(likes)} {Number(likes) === 1 ? "Like" : "Likes"}
        </p>
      </div>
      <div className="post__iframe">
        <video className="video-preview" controls name="media">
          <source src={post.preview_url} type="audio/mpeg" />
        </video>
      </div>
      <a href="https://open.spotify.com/" className="post__spotify-link">
        <img src={spotifyLogo} alt="" className="post__attribution" />
      </a>
    </div>
  );
};

export default MyPost;
