import React from "react";

const RecommendedSong = ({ song }) => {
  console.log(song);
  return (
    <div>
      <p>{song.name}</p>
      <p>{song.artists[0].name}</p>
      <p>{song.album.name}</p>
    </div>
  );
};

export default RecommendedSong;
