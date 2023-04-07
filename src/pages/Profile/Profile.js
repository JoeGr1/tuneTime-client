import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../componenets/Header/Header";
import MyPost from "../../componenets/MyPost/MyPost";
import { Link } from "react-router-dom";

import "./Profile.scss";

const Profile = ({ profile }) => {
  const [myPosts, setMyPosts] = useState(null);
  const [user, setUser] = useState(profile);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(null);
  const [followers, setFollowers] = useState(null);

  const session = sessionStorage.getItem("session");
  const sessionObj = JSON.parse(session);
  const sessionUser = sessionObj.sessionProfile;
  useEffect(() => {
    setUser(sessionUser);
  }, []);

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
      setFollowers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      const getMyPosts = async () => {
        const myId = profile.spotify_id;
        console.log(myId);

        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/posts/${myId}`
        );

        setMyPosts(data);
      };
      getMyPosts();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getFollowing();
    getFollowers();
  }, [user]);

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
            <h2 className="profile__name">{profile.user_name}</h2>

            <Link
              to={`/profile/${profile.spotify_id}/followers`}
              className="profile__follower-link"
            >
              <p className="profile__followers">
                Followers: {followers.length}
              </p>
            </Link>
            <Link
              to={`/profile/${profile.spotify_id}/followers`}
              className="profile__follower-link"
            >
              <p className="profile__following">
                Following: {following.length}
              </p>
            </Link>
          </div>

          {myPosts &&
            myPosts.map((post) => {
              return (
                <Link key={post.id} className="feed__post-link">
                  <MyPost post={post} className="feed__post-link" />
                </Link>
              );
            })}

          {!myPosts && (
            <h3 className="profile__no-posts-msg">You Have No Posts</h3>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
