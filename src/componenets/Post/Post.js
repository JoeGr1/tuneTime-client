import React from "react";

import "./Post.scss";

const Post = ({ post }) => {
  return (
    <div className="post-wrapper">
      <img
        src={post.album_cover}
        alt="albumcover"
        className="post__album-cover"
      />
      <div className="post__text-wrapper">
        <h2 className="post__songname">{post.song_name}</h2>
        <div className="post__song-details">
          <p className="post__artist">{post.artist}</p>
          <p className="post__album">{post.album}</p>
        </div>
        <p className="post__song-duration">{post.song_duration}</p>
      </div>
    </div>
  );
};

export default Post;
