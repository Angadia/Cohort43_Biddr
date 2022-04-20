import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./css/AuctionShowPage.css";
import AuctionDetails from "./AuctionDetails";
import BidList from "./BidList";
import { Auction } from "../api/auction";
import { Bid } from "../api/bid";
import Spinner from "./Spinner";

export default function AuctionShowPage() {
  let { id } = useParams();
  const [auction, setAuction] = useState({});
  const [errors, setErrors] = useState([]);
  const [noError, setNoError] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Auction.one(id).then((auctionData) => {
      setAuction(auctionData);
      setIsLoading(false);
    });
  }, [id]);

  const createBid = (event) => {
    event.preventDefault();
    const { currentTarget } = event;
    const fd = new FormData(currentTarget);

    const newBid = {
      bid_amount: fd.get("new_bid_amount"),
      auction_id: auction.id,
    };

    Bid.create(newBid).then((bid) => {
      if (!bid.errors) {
        Auction.one(id).then((auction) => {
          setAuction(auction);
          setErrors([]);
          setNoError(true);
          setIsLoading(false);
        });
      } else {
        setErrors(bid.errors);
        setNoError(null);
      }
    });

    currentTarget.reset();
  };

  if (isLoading) {
    return <Spinner message="Loading Auction Details..." />;
  }
  return (
    <div className="Page">
      <AuctionDetails {...auction} />
      <form className="NewBidForm ui form" onSubmit={createBid}>
        {noError && errors.map((err) => <p>{err}</p>)}
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
