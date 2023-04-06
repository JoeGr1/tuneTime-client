import React from "react";
import FeedPost from "../FeedPost/FeedPost";

import "./SinglePost.scss";

const SinglePost = ({ post, setShowmodal }) => {
  return (
    <div className="single-post">
      <div className="single-post__card">
        <p style={{ color: "black" }} onClick={() => setShowmodal(false)}>
          Close Modal
        </p>
        <FeedPost post={post} />
      </div>
    </div>
  );
};

export default SinglePost;
