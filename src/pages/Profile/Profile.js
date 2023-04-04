import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../componenets/Header/Header";
import MyPost from "../../componenets/MyPost/MyPost";
import { Link } from "react-router-dom";

import "./Profile.scss";

const Profile = ({ session, profile }) => {
  const [myPosts, setMyPosts] = useState(null);
  const [followers, setFollowers] = useState(null);

  useEffect(() => {
    try {
      setFollowers(6);
      const getMyPosts = async () => {
        const myId = profile.spotify_id;
        console.log(myId);

        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/posts/${myId}`
        );

        console.log(data);

        setMyPosts(data);
      };
      getMyPosts();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="profile-fragment">
      <Header />
      <div className="profile-wrapper">
        <div className="profile__info">
          <h2 className="profile__name">{profile.user_name}</h2>
          <p className="profile__folllowers">Followers: {followers}</p>
        </div>

        {myPosts &&
          myPosts.map((post) => {
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

        {!myPosts && (
          <h3 className="profile__no-posts-msg">You Have No Posts</h3>
        )}
        {/* <button type="button" onClick={handleClick}>
        test get song
      </button> */}
        {/* {currentSong !== null && <p>{currentSong}</p>} */}
      </div>
    </div>
  );
};

export default Profile;
