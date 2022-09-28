import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/UserAction";
import Spinner from "react-bootstrap/Spinner";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(state => state.user);
  console.log(user?.userInfo?._id);
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (user?.userInfo?.userType === 'employee') {
      navigate('/users/home')
    }
    if (user?.userInfo?.userType === 'employer') {
      navigate('/employer/home')
    }
  },[user,dispatch])

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <div className="box">
          <h1>Login to Getwork</h1>

          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="Enter you Email"
            name=""
            id=""
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter you Password"
            required
          />
          
          {user?.loading ? <Spinner animation="border" role="status"></Spinner> : ''}
          {user?.error ? <p>{user?.error}</p> : ''}
          <button className="vt-inp">Continue with email</button>

          <div className="line-wrapper">
            <div className="line"></div>
            <p>or</p>
            <div className="line"></div>
          </div>

          <button type="submit" className="btn-1">
            <img src="https://blog.hubspot.com/hubfs/image8-2.jpg" alt="" />
            <p>Continue with Google</p>
          </button>

          <p className="p">
            new to getwork.com ?{" "}
            <Link
              style={{ color: "blue", textDecoration: "none" }}
              to="/signup"
            >
              SignUp
            </Link>{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
