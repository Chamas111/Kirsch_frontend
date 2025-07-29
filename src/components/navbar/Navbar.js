import "./navbar.css";
import search from "./fotos/14794106671556282358.svg";
import app from "./fotos/14155164661594722077.svg";
import logo from "./fotos/logo.svg";
import expand from "./fotos/20037581261630422108.svg";
import settings from "./fotos//4157467991600002640.svg";
import notification from "./fotos/11632223091641180049.svg";
function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="" />
        <span>Umzugsunternehmen Kirsch GmbH</span>
      </div>
      <div className="icons">
        <img src={search} alt="" className="icon" />
        <img src={app} alt="" className="icon" />
        <img src={expand} alt="" className="icon" />
        <div className="notification">
          <img src={notification} alt="" className="icon" />
          <span>1</span>
        </div>
        <div className="user">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3wEbguhOA1bxt-fsx-N_OpNWXX0FYp7oRJQ&s"
            alt=""
          />
          <span>Jane</span>
        </div>
        <img src={settings} alt="" className="icon" />
      </div>
    </div>
  );
}

export default Navbar;
