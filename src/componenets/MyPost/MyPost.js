import React, { useEffect, useState } from "react";
import axios from "axios";

import "./MyPost.scss";
import "../FeedPost/FeedPost.scss";

import notLiked from "../../assets/icons/heart.svg";
import liked from "../../assets/icons/heartFill2.svg";

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
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/posts/${post.id}/liked/${user.spotify_id}`
        );
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
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/posts/${post.id}/like`,
        likeUpdate
      );
    } catch (error) {}

    setLikes(likes + 1);
    setIsLiked(!isLiked);
  };

  const handleUnlike = async () => {
    const likeUpdate = {
      spotify_id: user.spotify_id,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/posts/${post.id}/unlike`,
        likeUpdate
      );
    } catch (error) {}

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
            <img
              src={liked}
              alt="Like Icon"
              className="post__like-icon"
              // onClick={handleUnlike}
            />
          </button>
        )}
        {!isLiked && (
          <button className="post__btn" onClick={handleLike}>
            <img
              src={notLiked}
              alt="Like Icon"
              className="post__like-icon"
              // onClick={handleLike}
            />
          </button>
        )}
        <p className="post__likes">
          {Number(likes)} {Number(likes) === 1 ? "Like" : "Likes"}
        </p>
      </div>
    </div>
  );
};

export default MyPost;
