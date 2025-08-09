import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import axios from "../../axiosinstance";
function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/auth/register", user)
      .then((res) => {
        console.log("dddd", res.data);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <div class="container register">
      <div class="row">
        <div class="col-md-3 register-left">
          <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
          <h3>Welcome</h3>
          <p>Please Login if you already have an account!</p>
          <button type="submit" name="" className="btn btn-success">
            <Link to="/login"> Login</Link>
          </button>
          <br />
        </div>
        <div class="col-md-9 register-right">
          <h3 class="register-heading">Apply as a Employee</h3>
          <form onSubmit={handleSubmit}>
            <div class="row register-form">
              <div class="col-md-6">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Name *"
                    value={user.username}
                    name="username"
                    onChange={handleChange}
                  />
                </div>

                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password *"
                    value={user.password}
                    name="password"
                    onChange={handleChange}
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Confirm Password *"
                    value={user.confirmPassword}
                    name="confirmPassword"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Your Email *"
                    value={user.email}
                    name="email"
                    onChange={handleChange}
                  />
                </div>

                <input type="submit" class="btnRegister" value="Register" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
