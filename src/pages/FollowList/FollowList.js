import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../componenets/Header/Header";
import AccountCard from "../../componenets/AccountCard/AccountCard";

import Footer from "../../componenets/Footer/Footer";

import axios from "axios";
import { v4 as uuid } from "uuid";

import "./FollowList.scss";

const FollowList = () => {
  const [displayedProfile, setDisplayedProfile] = useState();

  const [accountList, setAccountList] = useState([]);

  const [loading, setloading] = useState(true);

  const sessionProfile = sessionStorage.getItem("sessionProfile");
  const user = JSON.parse(sessionProfile);

  const { id: spotify_id, listType } = useParams();

  useEffect(() => {
    if (spotify_id === user.spotify_id) {
      setDisplayedProfile(user);
    } else {
      const getProfile = async () => {
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/api/users/${spotify_id}`
          );
          setDisplayedProfile(data[0]);
        } catch (error) {
          console.log(error);
        }
      };
      getProfile();
    }
  }, []);

  useEffect(() => {
    if (displayedProfile) {
      const getList = async () => {
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/api/users/${listType}/${displayedProfile.spotify_id}`
          );
          // correct data here ( make spotify_id === following_id and remove following_d from objects)
          let list;

          if (listType === "following") {
            list = data.map((account) => {
              return { ...account, ["spotify_id"]: account.following_id };
            });
          } else {
            list = data;
          }
          setAccountList(list);
        } catch (error) {
          console.log(error);
        }
      };
      getList();
    }
  }, [displayedProfile]);

  useEffect(() => {
    if (displayedProfile) {
      setloading(false);
    }
  }, [displayedProfile]);

  // api call to logged in users followers
  // api call to spotify_id followers

  return (
    <div className="fragment">
      <Header />
      {loading && <p>loading...</p>}
      {!loading && (
        <div className="follow-list-wrapper">
          <h2 className="follow-list-title">
            {displayedProfile.user_name}'s {listType}
          </h2>
          {accountList.length > 0 &&
            accountList.map((account) => {
              return <AccountCard key={uuid()} account={account} />;
            })}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default FollowList;
