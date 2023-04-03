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
  const [serverSession, setServerSession] = useState({
    //   access_token: "",
    //   token_type: "",
    //   expires_in: 0,
    //   refresh_token: "",
    //   scope: "",
    //   sessionProfile: { id: "", display_name: "" },
  });

  let access_token;

  useEffect(() => {
    const getToken = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/get-tokens`
        );
        console.log(data);
        setServerSession(data);
        access_token = data.access_token;
        console.log(access_token);
        console.log(serverSession);
        const newProfile = {
          id: serverSession.sessionProfile.id,
          user_name: serverSession.sessionProfile.display_name,
        };
        console.log(newProfile);
        setCurrentProfile({ ...newProfile });
        // console.log(currentProfile);
      } catch (err) {
        console.log(err);
      }
    };

    getToken();
  }, []);

  // useEffect(() => {
  //   access_token = serverSession.access_token;
  // }, [serverSession]);

  // useEffect(() => {
  //   const newProfile = {
  //     id: serverSession.sessionProfile.id,
  //     user_name: serverSession.sessionProfile.display_name,
  //   };
  //   setCurrentProfile({ ...newProfile });
  // }, [serverSession]);

  // useEffect(() => {
  //   access_token = serverSession.access_token;
  //   console.log(serverSession);
  //   const newProfile = {
  //     id: serverSession.sessionProfile.id,
  //     user_name: serverSession.sessionProfile.display_name,
  //   };
  //   console.log(newProfile);
  //   setCurrentProfile({ ...newProfile });
  // }, [serverSession]);

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
        // user_id: serverSession.sessionProfile.id,
        // user_name: serverSession.sessionProfile.display_name,
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

    // console.log(newPost);

    // if (response.status !== 200) {
    //   const response = await axios.get(
    //     "https://api.spotify.com/v1/me/player/recently-played?limit=1",
    //     {
    //       headers: currentlyPlayingHeader,
    //     }
    //   );
    //   console.log(response);

    //   console.log(response.data);
    //   console.log(response.data.item.name);
    // } else {
    //   console.log(response.data.item.name);
    // }
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
