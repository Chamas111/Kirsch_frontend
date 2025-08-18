import { useState, useEffect } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import axios from "../../axiosinstance";
import logo from "../navbar/fotos/logo.svg";

function Navbar({ isLoggedin, setIsLoggedin }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);

  // Fetch logged-in user
  useEffect(() => {
    if (isLoggedin) {
      axios
        .get("auth/loggedin-user")
        .then((res) => setUser(res.data))
        .catch((err) => console.log(err.response?.data));
    }
  }, [isLoggedin]);

  const handleLogout = () => {
    axios
      .post("auth/logout", {}, { withCredentials: true })
      .then(() => {
        setIsLoggedin(false);
        navigate("/login");
      })
      .catch((err) => console.log(err.response?.data));
  };

  // --- Search handling ---
  const queryParams = new URLSearchParams(location.search);
  const initialQuery =
    location.pathname === "/search" ? queryParams.get("query") || "" : "";

  const [query, setQuery] = useState(initialQuery);

  // Clear search input when navigating away from /search
  useEffect(() => {
    if (location.pathname !== "/search") setQuery("");
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light py-2">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img
            className="img-fluid rounded-circle"
            src={logo}
            alt="Logo"
            width="48"
            height="48"
          />
        </NavLink>

        {/* Search Box */}
        <div className="ms-lg-auto d-flex align-items-center gap-3">
          <form className="d-flex mx-auto" onSubmit={handleSearch}>
            <input
              type="search"
              className="form-control me-2"
              placeholder="Suche..."
              value={query}
              onChange={(e) => {
                const val = e.target.value;
                setQuery(val);

                // If user clears input via the ❌ inside input
                if (val === "" && location.pathname === "/search") {
                  navigate(-1);
                }
              }}
            />
            <button type="submit" className="btn btn-outline-primary">
              🔍
            </button>
          </form>

          {/* User controls */}
          <div className="ms-lg-auto d-flex align-items-center gap-3">
            {isLoggedin ? (
              <>
                {user && (
                  <div className="d-flex align-items-center gap-2">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.username}
                        className="rounded-circle"
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                        style={{
                          width: "40px",
                          height: "40px",
                          fontWeight: "bold",
                        }}
                      >
                        {user.username?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="fw-bold">{user.username}</span>
                  </div>
                )}

                <button className="btn btn-danger ms-3" onClick={handleLogout}>
                  Logout
                </button>
              </>
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
      </div>
    </nav>
  );
}

export default Navbar;
