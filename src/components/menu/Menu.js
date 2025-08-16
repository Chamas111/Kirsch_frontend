import React from "react";
import "./menu.css";
import { Link } from "react-router-dom";
import home from "../navbar/fotos/home.svg";
import profile from "../navbar/fotos/profile.svg";
import { menu } from "../../data";
function Menu() {
  return (
    <div className="menu">
      <p class="text-center p-3">Menu</p>

      {menu[0].listItems.map((item) => (
        <div className="item" key={item.id}>
          <Link to={item.url} className="title listItem">
            <img src={item.icon} alt="" /> {item.title}
          </Link>

          {item.subItems && (
            <div className="title" style={{ paddingLeft: "20px" }}>
              {item.subItems.map((sub) => (
                <Link className="listItem" key={sub.id} to={sub.url}>
                  <img src={sub.icon} alt="" /> {sub.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Menu;
