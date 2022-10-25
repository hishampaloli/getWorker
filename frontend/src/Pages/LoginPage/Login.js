import React, { useEffect, useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPassword,
  forgotPasswordVerify,
  login,
} from "../../actions/UserAction";
import Spinner from "react-bootstrap/Spinner";
import CustomSpinner from "../../components/customSpinner/CustomSpinner";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [reset, setReset] = useState(false);
  const [otpSent, setSentOtp] = useState(false);
  const [otp, setOtp] = useState("");

  const user = useSelector((state) => state.user);
  const forgotPasswordData = useSelector((state) => state.forgotPassword);


  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const handleOtp = (e) => {
    e.preventDefault();

    dispatch(forgotPassword(email));
      if (
        forgotPasswordData.message === "Success" &&
        forgotPassword.message !== "No such user found"
      ) {
        setSentOtp(true);
      } else {
        setSentOtp(false);
      }
   
  };

  const handleForgot = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordVerify(email, otp, password));
    setOtp("");
    setPassword("");
    setEmail("");
    if (forgotPasswordData.message === "failed") {
      setTimeout(() => {
        setSentOtp(false);
      }, 1500);
    } else {
      setTimeout(() => {
        setReset(false);
        setSentOtp(false);
      }, 1500);
    }
  };

  useEffect(() => {
    if (user?.userInfo?.userType === "employee") {
      navigate("/users/home");
    }
    if (user?.userInfo?.userType === "employer") {
      navigate("/employer/home");
    }
    if (user?.userInfo?.userType === "admin") {
      navigate("/admin/profile");
    }
  }, [user, dispatch]);

  return (
    <div className="login">
      {reset ? (
        <>
          {otpSent ? (
            <form onSubmit={handleForgot}>
              <div className="box">
                <h1>Reset Password</h1>
                <input
                  onChange={(e) => setOtp(e.target.value)}
                  type="Number"
                  value={otp}
                  placeholder="Enter OTP"
                  required
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  value={password}
                  placeholder="Enter a new Password"
                  required
                />
                {user?.loading ? <CustomSpinner /> : ""}
                {user?.error ? <p>{user?.error}</p> : ""}
                <button type="submit" className="vt-inp">
                  Verify and Update
                </button>
                {forgotPasswordData.message === "failed" ? "Incorrect OTP" : ""}
                {forgotPasswordData.message === "success"
                  ? "Password reset success, please login to continue"
                  : ""}
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
          ) : (
            <form onSubmit={handleOtp}>
              <div className="box">
                <h1>Reset Password</h1>

                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  value={email}
                  placeholder="Enter you Email"
                  name=""
                  id=""
                />
                <button type="submit" className="vt-inp">
                  Sent Otp
                </button>
                {forgotPasswordData.message === "No such user found"
                  ? forgotPasswordData.message
                  : ""}
                {forgotPasswordData.loading ? <CustomSpinner /> : ""}
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
          )}
        </>
      ) : (
        <form onSubmit={handleLogin}>
          <div className="box">
            <h1>Login to <span style={{color: '#3ccf4e'}}>Getwork</span> </h1>

            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              value={email}
              placeholder="Enter you Email"
              name=""
              id=""
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter you Password"
              required
              value={password}
            />

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                width: "78%",
              }}
            >
              <p
                onClick={() => {
                  setReset(true);
                  setEmail("");
                  setPassword("");
                }}
                className="fg-p"
                style={{cursor: 'pointer'}}
              >
                Forgot Password ?
              </p>
            </div>

            {user?.loading ? <CustomSpinner /> : ""}
            {user?.error ? <p>{user?.error}</p> : ""}
            <button className="vt-inp">Continue with email</button>

         

        

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
      )}
    </div>
  );
};

export default Login;
