import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../componenets/Header/Header";

const FollowList = () => {
  const user = useParams();
  console.log(user);
  const { id: spotify_id, listType } = useParams();
  console.log(listType);

  const session = sessionStorage.getItem("session");
  const sessionObj = JSON.parse(session);
  const sessionUser = sessionObj.sessionProfile.id;

  try {
    console.log(spotify_id);
    if (!spotify_id) {
      console.log(sessionUser);
      // api call to logged in users followers
    }

    // api call to spotify_id followers
  } catch (error) {}

  return (
    <div className="fragment">
      <Header />
      <div className="accountlist-wrapper">
        <h2 className="accountlist-title"></h2>
        {spotify_id || sessionUser}'s {listType}
      </div>
    </div>
  );
};

export default FollowList;
