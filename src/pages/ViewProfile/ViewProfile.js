import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../componenets/Header/Header";
import MyPost from "../../componenets/MyPost/MyPost";
import { Link, useParams } from "react-router-dom";

import "./ViewProfile.scss";

const ViewProfile = ({ session }) => {
  const [posts, setPosts] = useState(null);
  const [profile, setProfile] = useState(null);
  const [following, setFollowing] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [areFollowing, setAreFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const user = useParams();

  useEffect(() => {
    try {
      const getPosts = async () => {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/posts/${user.id}`
        );
        setPosts(data);
      };

      const getProfile = async () => {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/users/${user.id}`
        );
        setProfile(...data);
      };
      getPosts();
      getProfile();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (profile && following && followers) {
      setLoading(false);
    }
  }, [followers, followers]);

  const isFollowing = (followList) => {
    return followList.some((follower) => {
      return follower.spotify_id === session.sessionProfile.id;
    });
  };

  useEffect(() => {
    if (followers && isFollowing(followers)) {
      setAreFollowing(true);
    }
  }, [followers]);

  const getFollowing = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/following/${profile.spotify_id}`
      );
      setFollowing(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFollowers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/following/followers/${profile.spotify_id}`
      );
      console.log(data);
      setFollowers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFollowing();
    getFollowers();
  }, [profile, areFollowing]);

  const handleFollowClick = () => {
    // console.log(profile);
    // console.log(profile.spotify_id);
    // console.log(session.sessionProfile.id);

    const postNewFollow = async () => {
      const newFollowObj = {
        spotify_id: session.sessionProfile.id,
        following_id: profile.spotify_id,
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
    // console.log(profile);
    // console.log(profile.spotify_id);
    // console.log(session.sessionProfile.id);

    const unfollow = async () => {
      const userId = session.sessionProfile.id;
      const followingId = profile.spotify_id;
      console.log(userId, followingId);
      try {
        const res = await axios.delete(
          `${process.env.REACT_APP_SERVER_URL}/api/following/${userId}/${followingId}`
        );
        setAreFollowing(false);
      } catch (error) {
        console.log(error);
      }
    };
    unfollow();
  };

  return (
    <div className="profile-fragment">
      <Header />

      {loading && <p>Loading ...</p>}
      {!loading && (
        <div className="profile-wrapper">
          <div className="profile__info">
            <h2 className="profile__name">{profile.user_name}</h2>
            <p className="profile__followers">Followers: {followers.length}</p>
            <p className="profile__following">Following: {following.length}</p>
            {!areFollowing && (
              <button
                className="profile__follow-btn"
                onClick={handleFollowClick}
              >
                Follow
              </button>
            )}
            {areFollowing && (
              <button
                className="profile__unfollow-btn"
                onClick={handleUnfollowClick}
              >
                Unfollow
              </button>
            )}
          </div>
          {posts &&
            posts.map((post) => {
              return (
                <Link
                  key={post.id}
                  to={`/profile/${post.id}`}
                  className="feed__post-link"
                >
                  <MyPost post={post} className="feed__post-link" />
                </Link>
              );
            })}

          {!posts && (
            <h3 className="profile__no-posts-msg">You Have No Posts</h3>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
