import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="ui secondary pointing menu">
      <NavLink to="/" className="item">
        Biddr
      </NavLink>
      <div className="ui secondary pointing right menu">
        <NavLink to="/" className="item">
          Home
        </NavLink>
        <NavLink to="/auctions" className="item">
          Auctions
        </NavLink>
        <NavLink to="/sign_in" className="item">
              Sign In
        </NavLink>
      </div>
    </div>
  );
};
