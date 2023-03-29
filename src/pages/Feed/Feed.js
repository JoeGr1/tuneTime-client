import React from "react";
import { Link } from "react-router-dom";
import Header from "../../componenets/Header/Header";
import Post from "../../componenets/Post/Post";

const Feed = () => {
  const posts = [
    {
      id: 111,
      user_id: 123,
      song_name: "songName",
      artist: "artist",
      album: "album",
      album_cover: "URL",
      song_duration: "4:20",
    },
  ];

  // API call to get list of posts by following

  return (
    <div className="feed-wrapper">
      <Header />
      {posts.map((post) => {
        return (
          <Link key={`post.id`} to={`/:post_id`} className="feed__post-link">
            <Post post={post} />
          </Link>
        );
      })}
    </div>
  );
};

export default Feed;
