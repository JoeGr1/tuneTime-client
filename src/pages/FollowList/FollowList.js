import React from "react";
import { useParams } from "react-router-dom";

const FollowList = ({ followingList, followerList, profile, listname }) => {
  const list = useParams();
  console.log(list);

  return (
    <div className="accountlist-wrapper">
      <h2 className="accountlist-title">
        {profile.user_name}'s {listname}
      </h2>

      {}
    </div>
  );
};

export default FollowList;
