import React from "react";
import FeedPost from "../FeedPost/FeedPost";

const SinglePost = ({ post }) => {
  return (
    <div className="single-post">
      <div className="single-post__card">
        <FeedPost post={post} />
      </div>
    </div>
  );
};

export default SinglePost;
