import React from "react";
import logo from "../../components/navbar/fotos/logo.svg";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
function Footer() {
  return (
    <section>
      <footer
        className="text-center text-white"
        style={{ backgroundColor: "#0a4275" }}
      >
        {/* Top section with text + button */}
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "120px" }}
        >
          <NavLink className="navbar-brand" to="/">
            <img
              className="img-fluid rounded-circle"
              src={logo}
              alt="Logo"
              width="100"
              height="100"
            />
          </NavLink>
        </div>

        {/* Bottom copyright bar */}
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2025 Copyright:{" "}
          <a className="text-white" href="https://mdbootstrap.com/">
            Ahmad Chamas
          </a>
        </div>
      </footer>
    </section>
  );
}

export default Footer;
