import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Header from "../../componenets/Header/Header";
import FeedPost from "../../componenets/FeedPost/FeedPost";
import MyPost from "../../componenets/MyPost/MyPost";

import axios from "axios";

import "./Feed.scss";
import SinglePost from "../../componenets/SinglePost/SinglePost";

const Feed = ({ session, profile }) => {
  const [posts, setPosts] = useState([]);

  const [currentProfile, setCurrentProfile] = useState(null);
  const [feedPosts, setFeedPosts] = useState(null);
  const [serverSession, setServerSession] = useState({});
  const [showModal, setShowmodal] = useState(false);
  const [postClicked, setPostClicked] = useState(null);

  useEffect(() => {
    setServerSession(session);
    setCurrentProfile(profile);
  });

  useEffect(() => {
    const user = currentProfile;

    console.log(user);

    if (!user) {
      return;
    } else {
      const createUser = async () => {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/api/users/create-user`,
            user
          );
        } catch (err) {
          console.log(err);
        }
      };
      createUser();
    }
  }, [currentProfile]);

  const handlePostClick = async () => {
    console.log(serverSession.access_token);

    if (!serverSession.access_token) {
      console.log("Could not find Access Tken");
      return;
    }

    const currentlyPlayingHeader = {
      Authorization: `Bearer ${serverSession.access_token}`,
    };

    try {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        { headers: currentlyPlayingHeader }
      );

      // ass validation and recently-played api call

      const newPost = {
        id: uuid(),
        spotify_id: serverSession.sessionProfile.id,
        user_name: serverSession.sessionProfile.display_name,
        song_name: response.data.item.name,
        artist_name: response.data.item.album.artists[0].name,
        album_name: response.data.item.album.album_group,
        album_cover: response.data.item.album.images[1].url,
        song_duration: "4:20",
      };

      setPosts([newPost]);
    } catch (err) {
      console.log(err);
    }

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/posts/feed/${currentProfile.spotify_id}`
      );

      // console.log(response.data);

      // console.log([...posts, ...response.data]);
      setFeedPosts([...response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = (post) => {
    setShowmodal(!showModal);
    setPostClicked(post);
  };

  return (
    <div className="feed-fragment">
      <Header />
      <div className="feed-wrapper">
        <button className="feed__post-tune-btn" onClick={handlePostClick}>
          post your tune
        </button>

        {postClicked && <SinglePost post={postClicked} />}

        {posts &&
          posts.map((post) => {
            return (
              <Link key={post.id} to={``} className="feed__post-link">
                <MyPost post={post} className="feed__post" />
              </Link>
            );
          })}
        {feedPosts &&
          feedPosts.map((post) => {
            return (
              <Link
                key={post.id}
                to={``}
                className="feed__post-link"
                onClick={() => {
                  toggleModal(post);
                }}
              >
                <FeedPost post={post} className="feed__post" />
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Feed;
