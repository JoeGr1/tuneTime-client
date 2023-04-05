import React from "react";
import FeedPost from "../FeedPost/FeedPost";

import "./SinglePost.scss";

const SinglePost = ({ post, toggleModal }) => {
  return (
    <div className="single-post" onClick={toggleModal}>
      <div className="single-post__card">
        <FeedPost post={post} />
      </div>
    </div>
  );
};

export default SinglePost;
