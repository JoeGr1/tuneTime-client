import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../componenets/Header/Header";
import Post from "../../componenets/Post/Post";
import { Link } from "react-router-dom";

const Profile = () => {
  // const [currentSong, setCurrentSong] = useState({});

  // const handleClick = (e) => {
  //   const getSong = async () => {
  //     const { response } = await axios.get(
  //       `${process.env.REACT_APP_SERVER_URL}/current-song`
  //     );
  //     console.log(response);
  //     setCurrentSong(response.data);
  //   };
  //   getSong();
  // };

  const myPosts = [
    {
      id: 111,
      user_id: 123,
      song_name: "songName",
      artist: "artist",
      album: "album",
      album_cover: "URL",
      song_duration: "4:20",
    },
  ];

  return (
    <div className="profile-wrapper">
      <Header />
      {myPosts.map((post) => {
        return (
          <Link key={post.id} to={`/:post_id`} className="feed__post-link">
            <Post post={post} />
          </Link>
        );
      })}
      {/* <button type="button" onClick={handleClick}>
        test get song
      </button> */}
      {/* {currentSong !== null && <p>{currentSong}</p>} */}
    </div>
  );
};

export default Profile;
