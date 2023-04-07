import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Header from "../../componenets/Header/Header";
import FeedPost from "../../componenets/FeedPost/FeedPost";
import MyPost from "../../componenets/MyPost/MyPost";

import axios from "axios";

import "./Feed.scss";
import SinglePost from "../../componenets/SinglePost/SinglePost";

const Feed = ({ session }) => {
  const [posts, setPosts] = useState(null);

  const [currentProfile, setCurrentProfile] = useState(null);
  const [feedPosts, setFeedPosts] = useState(null);
  const [showModal, setShowmodal] = useState(false);
  const [postClicked, setPostClicked] = useState(null);

  const sessionProfile = sessionStorage.getItem("sessionProfile");
  const user = JSON.parse(sessionProfile);

  useEffect(() => {
    setCurrentProfile(user);
  }, []);

  useEffect(() => {
    const createUser = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/users/create-user`,
          user
        );
      } catch (err) {
        console.log(err);
      }
      createUser();
    };
  }, [currentProfile]);

  const msToMins = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const persistPost = async (newPost) => {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/posts/`,
      newPost
    );
  };

  const getFeed = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/posts/feed/${user.spotify_id}`
    );
    setFeedPosts([...response.data]);
  };

  const handlePostClick = async () => {
    if (!session.access_token) {
      console.log("Could not find Access Tken");
      return;
    }

    const currentlyPlayingHeader = {
      Authorization: `Bearer ${session.access_token}`,
    };

    try {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        { headers: currentlyPlayingHeader }
      );

      // if user is not playimng music and respponse is null get most recently played
      if (response.status !== 200) {
        try {
          const response = await axios.get(
            "https://api.spotify.com/v1/me/player/recently-played?limit=1",
            { headers: currentlyPlayingHeader }
          );

          const newPost = {
            spotify_id: user.spotify_id,
            user_name: user.user_name,
            song_name: response.data.items[0].track.name,
            song_id: response.data.items[0].track.id,

            artist_name: response.data.items[0].track.album.artists[0].name,
            album_name: response.data.items[0].track.album.name,
            album_cover: response.data.items[0].track.album.images[1].url,
            song_duration: msToMins(response.data.items[0].track.duration_ms),
          };

          setPosts([newPost]);
          persistPost(newPost);
        } catch (err) {
          console.log(err);
        }
      } else {
        const newPost = {
          spotify_id: user.spotify_id,
          user_name: user.user_name,
          song_name: response.data.item.name,
          song_id: response.data.item.id,
          artist_name: response.data.item.album.artists[0].name,
          album_name: response.data.item.album.name,
          album_cover: response.data.item.album.images[1].url,
          song_duration: msToMins(response.data.item.duration_ms),
        };

        setPosts([newPost]);
        persistPost(newPost);
      }
    } catch (err) {
      console.log(err);
    }

    try {
      getFeed();
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
        {!posts && (
          <button className="feed__post-tune-btn" onClick={handlePostClick}>
            post your tune
          </button>
        )}

        {showModal && (
          <SinglePost post={postClicked} setShowmodal={setShowmodal} />
        )}

        {posts &&
          posts.map((post) => {
            return (
              <MyPost
                key={uuid()}
                post={post}
                className="feed__post feed__post-link"
              />
            );
          })}

        {feedPosts &&
          feedPosts.map((post) => {
            return (
              <FeedPost
                key={uuid()}
                post={post}
                className="feed__post"
                handleClick={() => {
                  toggleModal(post);
                }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Feed;
