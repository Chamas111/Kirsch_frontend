import Register from "../register/Register";
import "./login.css";
import { Link } from "react-router-dom";
function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h3 className="text-center text-info mb-4">Login</h3>
        <form>
          <div className="form-group mb-3">
            <label htmlFor="username" className="text-info">
              Username:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="form-control"
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password" className="text-info">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
            />
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              id="remember-me"
              name="remember-me"
              className="form-check-input"
            />
            <label htmlFor="remember-me" className="form-check-label text-info">
              Remember me
            </label>
          </div>

          <button type="submit" className="btn btn-info w-100">
            Submit
          </button>

          <div className="text-center mt-3">
            <Link
              to="/register"
              className="text-info text-black fs-6 text-decoration-underline icon-link icon-link-hover "
            >
              Register here!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
