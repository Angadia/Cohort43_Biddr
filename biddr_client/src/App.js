import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { User } from "./api/user";
import NavBar from "./components/NavBar";
import WelcomePage from "./components/WelcomePage";
import SignInPage from "./components/SignInPage";
import AuctionShowPage from "./components/AuctionShowPage";
import AuctionIndexPage from "./components/AuctionIndexPage";
import AuctionNewPage from "./components/AuctionNewPage";

export default function App() {
  const [user, setUser] = useState(sessionStorage.getItem("loggedInUser"));

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = () => {
    return User.current().then((user) => {
      if (user?.id) {
        sessionStorage.setItem("loggedInUser", JSON.stringify(user));
        setUser(user);
      }
    });
  };

  const onSignOut = () => {
    sessionStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <BrowserRouter>
      <header>
        <NavBar currentUser={user} onSignOut={onSignOut} />
      </header>
      <div className="ui container segment">
        <Routes>
          <Route exact path="/" element={<WelcomePage />} />
          <Route
            exact
            path="/sign_in"
            element={<SignInPage onSignIn={getCurrentUser} />}
          />
          <Route exact path="/auctions/new" element={<AuctionNewPage />} />
          <Route exact path="/auctions/:id" element={<AuctionShowPage />} />
          <Route exact path="/auctions" element={<AuctionIndexPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
