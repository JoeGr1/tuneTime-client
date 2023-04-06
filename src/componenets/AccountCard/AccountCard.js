import React, { useEffect, useState } from "react";
import axios from "axios";

import "./AccountCard.scss";

const AccountCard = ({ account, session }) => {
  const [followers, setFollowers] = useState(null);
  const [areFollowing, setAreFollowing] = useState(false);

  const profile = account.spotify_id;
  const user = session.sessionProfile.id;

  const getFollowers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/following/followers/${profile}`
      );
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
      return follower.spotify_id === user;
    });
  };

  useEffect(() => {
    if (followers && isFollowing(followers)) {
      setAreFollowing(true);
    }
  }, [followers]);

  const handleFollowClick = () => {
    const postNewFollow = async () => {
      const newFollowObj = {
        spotify_id: user,
        following_id: profile,
      };

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/following/`,
          newFollowObj
        );
        setAreFollowing(true);
      } catch (error) {
        console.log(error);
      }
    };
    postNewFollow();
  };

  const handleUnfollowClick = () => {
    const unfollow = async () => {
      try {
        const res = await axios.delete(
          `${process.env.REACT_APP_SERVER_URL}/api/following/${user}/${profile}`
        );
        setAreFollowing(false);
      } catch (error) {
        console.log(error);
      }
    };
    unfollow();
  };

  return (
    <div className="account-card-wrapper">
      <h2 className="account-card__name">{account.user_name}</h2>
      {!areFollowing && (
        <button
          className="account-card__follow-btn"
          onClick={handleFollowClick}
        >
          Follow
        </button>
      )}
      {areFollowing && (
        <button
          className="account-card__unfollow-btn"
          onClick={handleUnfollowClick}
        >
          Unfollow
        </button>
      )}
    </div>
  );
};

export default AccountCard;
