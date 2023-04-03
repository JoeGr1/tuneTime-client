import React, { useState } from "react";
import { Link } from "react-router-dom";
import AccountCard from "../../componenets/AccountCard/AccountCard";
import Header from "../../componenets/Header/Header";
import axios from "axios";

import "./Discover.scss";

const Discover = () => {
  const accounts = [
    {
      id: 111,
      spotify_id: 123,
      spotify_name: "accountName",
    },
  ];
  const [matchedAccounts, setMatchedAccounts] = useState(accounts);

  // localhost/users/:name
  //use params in back to query knex db

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value;

    try {
      const { response } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/users/${searchTerm}`
      );
      console.log(response);

      setMatchedAccounts(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="discover-fragment">
      <Header />
      <div className="discover-wrapper">
        <form action="" className="discover-form">
          <input
            type="text"
            name="search"
            className="discover-form__search"
            placeholder="Find More People"
          />
          <button
            type="submit"
            className="discover-form__search-btn"
            onSubmit={handleSubmit}
          >
            Search
          </button>
        </form>
        {matchedAccounts.length > 0 &&
          matchedAccounts.map((account) => {
            return <AccountCard key={account.id} account={account} />;
          })}
        {matchedAccounts.length === 0 && (
          <h3 className="discover__no-accounts-msg">User does not Exist </h3>
        )}
      </div>
    </div>
  );
};

export default Discover;
