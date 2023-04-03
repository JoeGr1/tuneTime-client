import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Header from "../../componenets/Header/Header";
import Post from "../../componenets/Post/Post";

import axios from "axios";

import "./Feed.scss";

const Feed = () => {
  const [posts, setPosts] = useState([
    {
      id: uuid(),
      user_id: 123,
      song_name: "songName",
      artist: "artist",
      album: "album",
      album_cover: "URL",
      song_duration: "4:20",
    },
  ]);

  const [currentProfile, setCurrentProfile] = useState({});
  const [serverSession, setServerSession] = useState({});

  let access_token;

  useEffect(() => {
    const getToken = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/get-session`
        );

        setServerSession(data);

        access_token = data.access_token;

        const newProfile = {
          id: data.sessionProfile.id,
          user_name: data.sessionProfile.display_name,
        };

        setCurrentProfile(newProfile);
      } catch (err) {
        console.log(err);
      }
    };

    getToken();
  }, []);

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

      const newPost = {
        id: uuid(),
        user_id: serverSession.sessionProfile.id,
        user_name: serverSession.sessionProfile.display_name,
        song_name: response.data.item.name,
        artist_name: response.data.item.album.artists[0].name,
        album_name: response.data.item.album.album_group,
        album_cover: response.data.item.album.images[1].url,
        song_duration: "4:20",
      };
      console.log(newPost);

      setPosts([...posts, newPost]);
    } catch (err) {
      console.log(err);
    }
  };

  // API call to get list of posts by following

  return (
    <div className="feed-fragment">
      <Header />
      <div className="feed-wrapper">
        <button className="feed__post-tune-btn" onClick={handlePostClick}>
          post your tune
        </button>

        {posts.map((post) => {
          return (
            <Link key={post.id} to={`/:post_id`} className="feed__post-link">
              <Post post={post} className="feed__post" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Feed;
