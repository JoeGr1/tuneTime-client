import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../componenets/Header/Header";
import MyPost from "../../componenets/MyPost/MyPost";
import Footer from "../../componenets/Footer/Footer";
import { Link } from "react-router-dom";

import "./Profile.scss";
import {
  GET_FOLLOWERS_BY_USER_ID,
  GET_FOLLOWING_BY_USER_ID,
  GET_POSTS_BY_USER_ID,
} from "../../utils/apiCalls";

const Profile = () => {
  const [myPosts, setMyPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(null);
  const [followers, setFollowers] = useState(null);

  const sessionProfile = sessionStorage.getItem("sessionProfile");
  const user = JSON.parse(sessionProfile);

  const getFollowing = async () => {
    try {
      const { data } = await GET_FOLLOWING_BY_USER_ID(user.spotify_id);
      setFollowing(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFollowers = async () => {
    try {
      const { data } = await GET_FOLLOWERS_BY_USER_ID(user.spotify_id);
      setFollowers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFollowing();
    getFollowers();
  }, []);

  const getMyPosts = async () => {
    try {
      const { data } = await GET_POSTS_BY_USER_ID(user.spotify_id);
      const list = data.reverse();

      setMyPosts(list);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMyPosts();
  }, []);

  useEffect(() => {
    if (followers && following) {
      setLoading(false);
    }
  }, [followers, following]);

  return (
    <div className="profile-fragment">
      <Header />
      {loading && <p>Loading ...</p>}
      {!loading && (
        <div className="profile-wrapper">
          <div className="profile__info">
            <h2 className="profile__name">{user.user_name}</h2>
            <div className="profile__follow-info">
              <Link
                to={`/profile/${user.spotify_id}/followers`}
                className="profile__followers-link"
              >
                <p className="profile__followers">
                  Followers: {followers.length}
                </p>
              </Link>
              <Link
                to={`/profile/${user.spotify_id}/following`}
                className="profile__followers-link"
              >
                <p className="profile__following">
                  Following: {following.length}
                </p>
              </Link>
            </div>
          </div>

          {myPosts &&
            myPosts.map((post) => {
              return (
                <MyPost key={post.id} post={post} className="feed__post-link" />
              );
            })}

          {!myPosts && (
            <h3 className="profile__no-posts-msg">You Have No Posts</h3>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Profile;
