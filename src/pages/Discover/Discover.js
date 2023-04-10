import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountCard from "../../componenets/AccountCard/AccountCard";
import Header from "../../componenets/Header/Header";
import Footer from "../../componenets/Footer/Footer";

import axios from "axios";

import "./Discover.scss";
import { GET_USERS_BY_SEARCH } from "../../utils/apiCalls";
import Recommendations from "../../componenets/Recommendations/Recommendations";

const Discover = () => {
  const [searchInput, setSearchInput] = useState(null);
  const [matchedAccounts, setMatchedAccounts] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [show, setShow] = useState(false);

  const sessionProfile = sessionStorage.getItem("sessionProfile");
  const user = JSON.parse(sessionProfile);

  // localhost/users/:name
  //use params in back to query knex db

  useEffect(() => {
    if (!matchedAccounts.length) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [matchedAccounts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value;

    try {
      const { data } = await GET_USERS_BY_SEARCH(searchTerm);

      const list = data.filter((accounts) => {
        return accounts.spotify_id !== user.spotify_id;
      });

      setMatchedAccounts(list);
    } catch (err) {
      console.log(err);
    }

    setFormSubmitted(true);
  };

  useEffect(() => {
    const getMatched = async () => {
      try {
        if (!searchInput) {
          setShow(false);
          return;
        }
        const { data } = await GET_USERS_BY_SEARCH(searchInput);

        const matchedList = data.filter((accounts) => {
          return accounts.spotify_id !== user.spotify_id;
        });

        setMatchedAccounts(matchedList);
      } catch (err) {
        console.log(err);
      }
    };
    getMatched();
  }, [searchInput]);

  return (
    <div className="discover-fragment">
      <Header />
      <div className="discover-wrapper">
        <form action="" className="discover-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="search"
            className="discover-form__search"
            placeholder="Find More People"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" className="discover-form__search-btn">
            Search
          </button>
        </form>
        {show &&
          matchedAccounts.length > 0 &&
          matchedAccounts.map((account) => {
            return <AccountCard key={account.spotify_id} account={account} />;
          })}
        {show && formSubmitted && matchedAccounts.length === 0 && (
          <h3 className="discover__no-accounts-msg">User does not Exist </h3>
        )}
        <Recommendations />
      </div>
      <Footer />
    </div>
  );
};

export default Discover;
