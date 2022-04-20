import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import WelcomePage from "./components/WelcomePage";
// import { SignInPage } from "./components/SignInPage";
import AuctionShowPage from "./components/AuctionShowPage";
import AuctionIndexPage from "./components/AuctionIndexPage";

export default function App() {
  return (
    <BrowserRouter>
      <header>
        <NavBar />
      </header>
      <div className="ui container segment">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route exact path="/auctions" element={<AuctionIndexPage />} />
          {/* <Route exact path="/sign_in" element={<SignInPage />} /> */}
          <Route path="/auctions/:id" element={<AuctionShowPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
