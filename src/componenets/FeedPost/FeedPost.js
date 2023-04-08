import React from "react";

import "./FeedPost.scss";
import { Link } from "react-router-dom";

const FeedPost = ({ post, handleClick }) => {
  return (
    <div onClick={handleClick} className="post-wrapper">
      <Link to={`/profile/${post.spotify_id}`} className="post__user-name">
        <h3 className="post__user-name">{post.user_name}</h3>
      </Link>
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
    </div>
  );
};

export default FeedPost;
