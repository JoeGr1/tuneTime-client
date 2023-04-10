import React, { useEffect, useState } from "react";
import FeedPost from "../FeedPost/FeedPost";

import "./SinglePost.scss";
import {
  DELETE_COMMENT_BY_ID,
  GET_COMMENTS_BY_POST_ID,
  POST_COMMENT,
} from "../../utils/apiCalls";
import CommentCard from "../CommentCard/CommentCard";

const SinglePost = ({ post, setShowmodal }) => {
  const sessionProfile = sessionStorage.getItem("sessionProfile");
  const user = JSON.parse(sessionProfile);

  const [comments, setComments] = useState(null);

  useEffect(() => {
    const getComments = async () => {
      try {
        const { data } = await GET_COMMENTS_BY_POST_ID(post.id);
        setComments(data);
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.comment.value;

    const newComment = {
      post_id: post.id,
      spotify_id: user.spotify_id,
      user_name: user.user_name,
      content: content,
    };

    try {
      await POST_COMMENT(newComment);
      const { data } = await GET_COMMENTS_BY_POST_ID(post.id);
      setComments(data);
    } catch (error) {
      console.log(error);
    }
    e.target.reset();
  };

  const handleDelete = async (commentId, commentSpotifyId) => {
    if (user.spotify_id === commentSpotifyId) {
      try {
        await DELETE_COMMENT_BY_ID(commentId);
        const { data } = await GET_COMMENTS_BY_POST_ID(post.id);
        setComments(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div
      className="single-post"
      // onClick={() => setShowmodal(false)}
    >
      <div className="single-post__card">
        <p className="single-post__close" onClick={() => setShowmodal(false)}>
          Close
        </p>
        <FeedPost post={post} />
        <div className="comments">
          <h3 className="comments__title">Comments</h3>

          {comments &&
            comments.map((comment) => {
              return (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  handleDelete={handleDelete}
                  className="comments__comment"
                />
              );
            })}

          <form className="comments-form" onSubmit={handleSubmit}>
            <label htmlFor="comment" className="comments-form__label">
              {user.user_name}
            </label>
            <textarea
              className="comments-form__input"
              name="comment"
              id="comment"
              placeholder="Add a Comment"
            ></textarea>
            <button className="comments-form__submit" type="submit">
              Post Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
