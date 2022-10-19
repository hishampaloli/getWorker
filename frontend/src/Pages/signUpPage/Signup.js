import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./signup.scss";
import { userRegister, verifyEmail } from "../../actions/UserAction";
import {
  USER_REGISTER_SUCCESS,
  OTP_HELPER_FAIL,
} from "../../contants/userConstants.js";
import CustomSpinner from "../../components/customSpinner/CustomSpinner";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userType, setUserType] = useState("employee");
  const [userselect, setUserSelect] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setCPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const user = useSelector((state) => state.employee);
  const userStatus = useSelector((state) => state.user);
  const Otp = useSelector((state) => state.otp);



  useEffect(() => {
    if (Otp?.error) {

      setTimeout(() => {
        dispatch({
          type: OTP_HELPER_FAIL,
        });
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: {},
        });
      }, 2000);
    }

    if (
      userStatus?.userInfo?.userType === "employee" &&
      userStatus?.userInfo?.emailVerified
    ) {
      navigate("/users/home");
    }
    if (
      userStatus?.userInfo?.userType === "employer" &&
      userStatus?.userInfo?.emailVerified
    ) {
      navigate("/employer/home");
    }
    if (user?.userInfo?.userType === "admin") {
      navigate("/admin/profile");
    }
  }, [Otp,user]);

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      setErrMsg("Enter a valid email");
    }
    if (password !== confirmPassword) {
      setErrMsg("Both passwords does'nt match");
    }
    if (password.length < 6) {
      setErrMsg("Please enter a strong password with more than 6 char");
    }

    if (
      email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/) &&
      password.length >= 6 &&
      password === confirmPassword
    ) {
      dispatch(userRegister(name, email, password, userType));
    }
  };

  const handleOtp = (e) => {
    dispatch(verifyEmail(user?.users?._id, otp, userType));
  };

  return (
    <div className="main">
      <div>
        {userselect ? (
          <div>
            {!user?.users?._id ? (
              <form onSubmit={handleSignIn}>
                <div className="box">
                  <h1 style={{ marginBottom: "-10px" }}>
                    Sign IN to <span className="logo-text">getworker.com</span>
                  </h1>

                  {/* <button className="btn-1">
                    <img
                      src="https://blog.hubspot.com/hubfs/image8-2.jpg"
                      alt=""
                      srcSet=""
                    />
                    <p  >Continue with Google</p>
                  </button>

                  <div className="line-wrapper mt-5">
                    <div className="line"></div>
                    <p>or</p>
                    <div className="line"></div>
                  </div> */}

                  <div className="row">
                    <label htmlFor="">User Name</label>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      required
                      placeholder="Username"
                    />
                    <label htmlFor="">Email</label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      required
                      placeholder="Email"
                    />

                    <label htmlFor="">Password</label>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      required
                      placeholder="Password"
                      className=" mt-2"
                    />

                    <label htmlFor="">Confirm Password</label>
                    <input
                      onChange={(e) => setCPassword(e.target.value)}
                      type="password"
                      placeholder="ConfirmPassword"
                      className=" mt-2"
                      required
                    />
                  </div>

                  {user?.loading ? (
                    <CustomSpinner />
                  ) : (
                    ""
                  )}

                  {errMsg ? <p className="p-er mt-2">{errMsg}</p> : ""}

                  <div className="row">
                    <button type="submit" className="btn-2-sg">
                      Create my Account
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="box">
                <h1>Verify OTP</h1>
                {Otp.status ? (
                  <div style={{ marginTop: "40px" }}>
                    <p>
                      Succesfully registered. <Link to="/login">Login</Link> to
                      Continue
                    </p>{" "}
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <div className="row">
                      <input
                        className="otpInp"
                        onChange={(e) => setOtp(e.target.value)}
                        type="email"
                        required
                        placeholder="Enter Otp"
                      />
                    </div>
                    {Otp?.loading ? (
                      <CustomSpinner />
                    ) : (
                      ""
                    )}
                    {Otp?.error ? "incorrect otp, please sign up again" : ""}
                    <div className="row">
                      <button
                        onClick={handleOtp}
                        type="submit"
                        className="btn-2 btn-otp"
                      >
                        Verify Otp
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="box">
            <h1 style={{ color: "#3ccf4e" }} className="logo-text">
              GETWORKER
            </h1>
            <h1 style={{ marginTop: "-10px", marginBottom: "-20px" }}>
              Join as a Employer or Freelancer
            </h1>

            <div className="mini-box-wrapper">
              <div
                style={{
                  backgroundColor:
                    userType === "employer" ? "#1C2F1E" : "#B9E2B5",
                }}
                onClick={() => setUserType("employer")}
                className="mini-box-1"
              >
                <p>I am a Employer</p>
              </div>

              <div
                style={{
                  backgroundColor:
                    userType !== "employer" ? "#1C2F1E" : "#B9E2B5",
                }}
                onClick={() => setUserType("employee")}
                className="mini-box-2"
              >
                <p>I am a Freelance</p>
              </div>
            </div>

            <button className="btn-2" onClick={() => setUserSelect(userType)}>
              Join as a {userType === "employer" ? "Employer" : "Freelancer"}
            </button>

            <p className="p">
              Already have an account?{" "}
              <Link
                style={{ color: "blue", textDecoration: "none" }}
                to="/login"
              >
                Login
              </Link>{" "}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
