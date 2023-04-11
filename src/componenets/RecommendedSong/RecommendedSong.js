import React from "react";

import "./RecommendedSong.scss";

import spotifyIcon from "../../assets/icons/Spotify_Icon_RGB_Green.png";

const RecommendedSong = ({ song }) => {
  return (
    <div className="recomm-song-wrapper">
      <img
        src={song.album.images[0].url}
        alt="Album Cover"
        className="recomm-song__album-cover"
      />
      <div className="recomm-song__text-wrapper">
        <h3 className="recomm-song__name"> {song.name}</h3>
        <p className="recomm-song__artist">{song.artists[0].name}</p>
        <p className="recomm-song__album">{song.album.name}</p>
      </div>
      <a href="https://open.spotify.com/" className="recomm-song__spotify-link">
        <img
          src={spotifyIcon}
          alt="Spotify Icon"
          className="recomm-song__attribution"
        />
      </a>
    </div>
  );
};

export default RecommendedSong;
