import React from "react";

import "./AccountCard.scss";

const AccountCard = ({ account }) => {
  return (
    <div className="account-card-wrapper">
      <h2 className="account-card__name">{account.spotify_name}</h2>
      <button className="account-card__follow-btn">Follow</button>
    </div>
  );
};

export default AccountCard;
