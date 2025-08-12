import "./navbar.css";
import { useState, useEffect } from "react";
import axios from "../../axiosinstance";
import logo from "../navbar/fotos/logo.svg";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar({ isLoggedin, setIsLoggedin }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios
      .get("auth/loggedin-user")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [isLoggedin]);

  const handleLogout = () => {
    axios
      .post("auth/logout", {}, { withCredentials: true })
      .then((res) => {
        setIsLoggedin(false);
        console.log("Logged out");

        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-light py-2 ">
      <div class="container-fluid">
        <a class="navbar-brand" href="https://library.livecanvas.com/sections/">
          <img
            class="img-fluid rounded-circle"
            src={logo}
            alt=""
            width="48px"
            height="48px"
          />
        </a>
        <p className="align-text-top pt-3 fw-bolder">
          Umzugsunternehmen Kirsch GmbH
        </p>

        <div className="ms-lg-auto d-flex">
          {isLoggedin ? (
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <NavLink className="btn btn-success me-2" to="/login">
                Sign In
              </NavLink>
              <NavLink className="btn btn-primary" to="/register">
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
