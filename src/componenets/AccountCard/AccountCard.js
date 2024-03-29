import React, { useEffect, useState } from "react";
import axios from "axios";

import "./AccountCard.scss";
import { Link } from "react-router-dom";
import {
  DELETE_FOLLOW,
  GET_FOLLOWERS_BY_USER_ID,
  POST_NEW_FOLLOW,
} from "../../utils/apiCalls";

const AccountCard = ({ account }) => {
  const [followers, setFollowers] = useState(null);
  const [areFollowing, setAreFollowing] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const sessionProfile = sessionStorage.getItem("sessionProfile");
  const user = JSON.parse(sessionProfile);

  useEffect(() => {
    if (account.spotify_id === user.spotify_id) {
      setIsUser(true);
    }
  }, []);

  const getFollowers = async () => {
    try {
      const { data } = await GET_FOLLOWERS_BY_USER_ID(account.spotify_id);
      setFollowers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFollowers();
  }, [account, areFollowing]);

  const isFollowing = (followList) => {
    return followList.some((follower) => {
      return follower.spotify_id === user.spotify_id;
    });
  };

  useEffect(() => {
    if (followers && isFollowing(followers)) {
      setAreFollowing(true);
    }
  }, [followers]);

  const handleFollowClick = (e) => {
    const postNewFollow = async () => {
      const newFollowObj = {
        spotify_id: user.spotify_id,
        following_id: account.spotify_id,
      };

      try {
        const res = await POST_NEW_FOLLOW(newFollowObj);
        setAreFollowing(true);
      } catch (error) {
        console.log(error);
      }
    };
    postNewFollow();
  };

  const handleUnfollowClick = (e) => {
    const unfollow = async () => {
      try {
        const res = await DELETE_FOLLOW(user.spotify_id, account.spotify_id);
        setAreFollowing(false);
      } catch (error) {
        console.log(error);
      }
    };
    unfollow();
    e.stopPropagation();
  };

  return (
    <div className="account-card-wrapper">
      <Link
        key={account.spotify_id}
        to={`/profile/${account.spotify_id}`}
        className="account-card__profile-link"
      >
        <h2 className="account-card__name">{account.user_name}</h2>
      </Link>
      {!isUser && !areFollowing && (
        <button
          className="account-card__follow-btn"
          onClick={handleFollowClick}
        >
          Follow
        </button>
      )}
      {!isUser && areFollowing && (
        <button
          className="account-card__unfollow-btn"
          onClick={handleUnfollowClick}
        >
          Unfollow
        </button>
      )}
      {isUser && <h3 className="account-card__is-user">You</h3>}
    </div>
  );
};

export default AccountCard;
