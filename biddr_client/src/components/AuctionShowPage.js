import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./css/AuctionShowPage.css";
import AuctionDetails from "./AuctionDetails";
import BidList from "./BidList";
import { Auction } from "../api/auction";
import Spinner from "./Spinner";

export default function AuctionShowPage() {
  let { id } = useParams();
  const [auction, setAuction] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Auction.one(id).then((auctionData) => {
      setAuction(auctionData);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) {
    return <Spinner message="Loading Auction Details..." />;
  }
  return (
    <div className="Page">
      <AuctionDetails {...auction} />
      <form className="NewBidForm ui form">
        <div className="field">
          <input
            type="text"
            name="new_bid_amount"
            id="new_bid_amount"
            required
          />
        </div>
        <button className="ui orange button" type="submit">
          Bid
        </button>
      </form>
      <BidList bids={auction.bids} />
    </div>
  );
}
