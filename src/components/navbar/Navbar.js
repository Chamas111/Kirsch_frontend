import "./navbar.css";

import logo from "../navbar/fotos/logo.svg";
import { Link } from "react-router-dom";

function Navbar() {
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
        <button
          class="navbar-toggler "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav_lc"
          aria-controls="nav_lc"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="ms-lg-auto d-flex">
          <Link className="btn btn-success btn-md me-2" to="/login">
            Sign In
          </Link>
          <Link className="btn btn-primary" to="/register">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
