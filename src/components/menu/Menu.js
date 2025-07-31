import React from "react";
import "./menu.css";
import { Link } from "react-router-dom";
import home from "../navbar/fotos/home.svg";
import profile from "../navbar/fotos/profile.svg";
import { menu } from "../../data";
function Menu() {
  return (
    <div className="menu">
      {menu.map((item) => (
        <div className="item" key={item.id}>
          <span className="title">{item.title}</span>
          {item.listItems.map((listItems) => (
            <Link to="/" className="listItem" key={listItems.id}>
              <img src={listItems.icon} alt="" />
              <span className="listItemTitle">{listItems.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Menu;
