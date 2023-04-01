import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../componenets/Header/Header";
import Post from "../../componenets/Post/Post";

import axios from "axios";

import "./Feed.scss";

const Feed = () => {
  const [posts, setPosts] = useState([
    {
      id: 111,
      user_id: 123,
      song_name: "songName",
      artist: "artist",
      album: "album",
      album_cover: "URL",
      song_duration: "4:20",
    },
  ]);

  let serverSession;
  let refresh_token;
  let access_token;

  useEffect(() => {
    axios
      .get(`http://localhost:9090/get-tokens`)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        serverSession = response;
        console.log(serverSession);
        access_token = serverSession.data.access_token;
        console.log(access_token);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlePostClick = async () => {
    const currentlyPlayingHeader = {
      Authorization: `Bearer ${access_token}`,
    };

    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      { headers: currentlyPlayingHeader }
    );

    console.log(response);
    console.log(response.status);
    console.log(response.data);

    const newPost = {
      id: 112,
      user_id: 123,
      song_name: response.data.item.name,
      artist: response.data.item.album.artists[0].name,
      album: response.data.item.album.album_group,
      album_cover: response.data.item.album.images[1].url,
      song_duration: "4:20",
    };
    console.log(newPost);

    setPosts([...posts, newPost]);

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
