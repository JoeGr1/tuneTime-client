import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Header from "../../componenets/Header/Header";
import FeedPost from "../../componenets/FeedPost/FeedPost";
import MyPost from "../../componenets/MyPost/MyPost";
import SinglePost from "../../componenets/SinglePost/SinglePost";
import Footer from "../../componenets/Footer/Footer";

import axios from "axios";

import "./Feed.scss";
import "animate.css";
import {
  GET_FEED_BY_USER_ID,
  GET_POSTS_BY_USER_ID,
  POST_NEW_POST,
  POST_USER,
} from "../../utils/apiCalls";

const Feed = ({ session }) => {
  const [posts, setPosts] = useState(null);

  const [currentProfile, setCurrentProfile] = useState(null);
  const [feedPosts, setFeedPosts] = useState(null);
  const [showModal, setShowmodal] = useState(false);
  const [postClicked, setPostClicked] = useState(null);

  const sessionProfile = sessionStorage.getItem("sessionProfile");
  const user = JSON.parse(sessionProfile);

  useEffect(() => {
    const sessionPost = sessionStorage.getItem("sessionPost");
    if (sessionPost) {
      const post = JSON.parse(sessionPost);

      const getSessionPost = async () => {
        try {
          const { data } = await GET_POSTS_BY_USER_ID(user.spotify_id);

          setPosts([data[data.length - 1]]);
        } catch (error) {
          console.log(error);
        }
      };
      getSessionPost();
    }
  }, []);

  function removeSessionPostAtRandomTime() {
    const now = new Date();

    const randomHour = Math.floor(Math.random() * 24);

    const tuneTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      randomHour,
      Math.floor(Math.random() * 60),
      Math.floor(Math.random() * 60)
    );

    const timeDiff = tuneTime.getTime() - now.getTime();

    setTimeout(() => {
      sessionStorage.removeItem("sessionPost");
      console.log(
        "Removed sessionPost from sessionStorage at",
        new Date().toLocaleString()
      );
    }, timeDiff);
  }

  useEffect(() => {
    setCurrentProfile(user);
  }, []);

  useEffect(() => {
    const createUser = async () => {
      try {
        const response = await POST_USER(user);
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
    const response = await POST_NEW_POST(newPost);
  };

  const getFeed = async () => {
    try {
      const response = await GET_FEED_BY_USER_ID(user.spotify_id);

      setFeedPosts(response.data);
    } catch (error) {
      console.log(error);
    }
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
            preview_url:
              response.data.items[0].track.preview_url ||
              "https://p.scdn.co/mp3-preview/eb37b52243d63ea9e55f77dcbe056db40a0045fa?cid=0b60031ad2e947e9a47dff182d518607",
            artist_name: response.data.items[0].track.album.artists[0].name,
            artist_id: response.data.items[0].track.album.artists[0].id,
            album_name: response.data.items[0].track.album.name,
            album_cover: response.data.items[0].track.album.images[1].url,
            song_duration: msToMins(response.data.items[0].track.duration_ms),
            likes: "0",
          };

          await persistPost(newPost);

          const { data } = await GET_POSTS_BY_USER_ID(user.spotify_id);

          setPosts([data[data.length - 1]]);
          sessionStorage.setItem("sessionPost", JSON.stringify(newPost));
        } catch (err) {
          console.log(err);
        }
      } else {
        const newPost = {
          spotify_id: user.spotify_id,
          user_name: user.user_name,
          song_name: response.data.item.name,
          song_id: response.data.item.id,
          preview_url:
            response.data.item.preview_url ||
            "https://p.scdn.co/mp3-preview/eb37b52243d63ea9e55f77dcbe056db40a0045fa?cid=0b60031ad2e947e9a47dff182d518607",
          artist_name: response.data.item.album.artists[0].name,
          artist_id: response.data.item.album.artists[0].id,
          album_name: response.data.item.album.name,
          album_cover: response.data.item.album.images[1].url,
          song_duration: msToMins(response.data.item.duration_ms),
          likes: "0",
        };

        await persistPost(newPost);

        const { data } = await GET_POSTS_BY_USER_ID(user.spotify_id);

        setPosts([data[data.length - 1]]);
        sessionStorage.setItem("sessionPost", JSON.stringify(newPost));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (posts) {
      try {
        getFeed();
      } catch (error) {
        console.log(error);
      }
    }
  }, [posts]);

  const toggleModal = (post) => {
    setShowmodal(!showModal);
    setPostClicked(post);
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
    scrollToTop();
  };

  return (
    <div className="feed-fragment">
      <Header />
      <div className="feed-wrapper">
        {!posts && (
          <div className="feed__btn-wrapper">
            <button
              className="feed__post-tune-btn animate__animated animate__rubberBand animate__delay-2s"
              onClick={handlePostClick}
            >
              post your tune
            </button>
          </div>
        )}
        {posts && <h2 className="feed__title">Today's Feed</h2>}

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
                className="feed__post-link"
                handleClick={() => {
                  toggleModal(post);
                }}
              />
            );
          })}
      </div>
      <Footer />
    </div>
  );
};

export default Feed;
