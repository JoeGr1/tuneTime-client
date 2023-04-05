import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../componenets/Header/Header";
import MyPost from "../../componenets/MyPost/MyPost";
import { Link, useParams } from "react-router-dom";

import "./ViewProfile.scss";

const ViewProfile = () => {
  const [posts, setPosts] = useState(null);
  const [profile, setProfile] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useParams();

  useEffect(() => {
    try {
      setFollowers(6);
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
    if (profile) {
      setLoading(false);
    }
  }, [profile]);

  return (
    <div className="profile-fragment">
      <Header />

      {loading && <p>Loading ...</p>}
      {!loading && (
        <div className="profile-wrapper">
          <div className="profile__info">
            <h2 className="profile__name">{profile.user_name}</h2>
            <p className="profile__followers">Followers: {followers}</p>
            <button className="profile__follow-btn">Follow</button>
          </div>
          {posts &&
            posts.map((post) => {
              return (
                <Link
                  key={post.id}
                  to={`/profile/${post.id}`}
                  className="feed__post-link"
                >
                  <MyPost post={post} className="feed__post" />
                </Link>
              );
            })}

          {!posts && (
            <h3 className="profile__no-posts-msg">You Have No Posts</h3>
          )}
          {/* <button type="button" onClick={handleClick}>
        test get song
      </button> */}
          {/* {currentSong !== null && <p>{currentSong}</p>} */}
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
