import React, { useEffect, useState } from "react";

const CommentCard = ({ comment, handleDelete }) => {
  const [isUserComment, setIsUserComment] = useState(false);

  const sessionProfile = sessionStorage.getItem("sessionProfile");
  const user = JSON.parse(sessionProfile);

  useEffect(() => {
    if (comment.spotify_id === user.spotify_id) {
      setIsUserComment(true);
    }
  }, []);

  return (
    <div className="comment__card">
      <h3 className="comment__name">{comment.user_name}:</h3>
      <p className="comment__content">{comment.content}</p>
      {isUserComment && (
        <p
          className="comment__delete"
          onClick={() => {
            handleDelete(comment.id, comment.spotify_id);
          }}
        >
          Delete
        </p>
      )}
    </div>
  );
};

export default CommentCard;
