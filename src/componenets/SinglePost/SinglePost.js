import React from "react";
import FeedPost from "../FeedPost/FeedPost";

import "./SinglePost.scss";

const SinglePost = ({ post, setShowmodal }) => {
  return (
    <div className="single-post">
      <div className="single-post__card">
        <p className="single-post__close" onClick={() => setShowmodal(false)}>
          Close
        </p>
        <FeedPost post={post} />
        {/* <div className="comments">
          <h3 className="comments__title">Comments</h3>
        </div> */}
      </div>
    </div>
  );
};

export default SinglePost;
