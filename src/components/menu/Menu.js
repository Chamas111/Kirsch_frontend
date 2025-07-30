import React from "react";
import "./menu.css";
import { Link } from "react-router-dom";
import home from "../navbar/fotos/home.svg";
import profile from "../navbar/fotos/profile.svg";
function Menu() {
  return (
    <div className="menu">
      <div className="item">
        <span className="title">Main</span>
        <Link to="/" className="listItem">
          <img src={home} alt="" />
          <span className="listItemTitle">Home</span>
        </Link>
        <Link to="/" className="listItem">
          <img src={profile} alt="" />
          <span className="listItemTitle">User</span>
        </Link>
      </div>
      <div className="item">
        <span className="title">Main</span>
        <Link to="/" className="listItem">
          <img src={home} alt="" />
          <span className="listItemTitle">Home</span>
        </Link>
        <Link to="/" className="listItem">
          <img src={profile} alt="" />
          <span className="listItemTitle">User</span>
        </Link>
      </div>
    </div>
  );
}

export default Menu;
