import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/UserAction";
import "./header.css";
import Dropdown from "react-bootstrap/Dropdown";
import CancelIcon from "@mui/icons-material/Cancel";
import { getEmployeeProfile } from "../../actions/EmplyeeActions";

const Header = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const [drop, setDrop] = useState(false);

  const userProfile = useSelector((state) => state.employeeData);
  const employerProfile = useSelector((state) => state.employerData);

  useEffect(() => {
    dispatch(getEmployeeProfile());
  }, [dispatch]);

  console.log(employerProfile);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div style={{ width: "100%" }}>
      <header>
        <div className="left">
          <Link style={{ color: "white", textDecoration: "none" }} to="/">
            <h2>GETWORKER</h2>
          </Link>
        </div>

        {user?.userInfo?._id ? (
          <div className="right big-nav">
            {user?.userInfo?.userType === "employee" ? (
              <>
                <Link style={{ marginRight: "45px" }} to="/user/myjobs ">
                  My Jobs
                </Link>
                <Link style={{ marginRight: "45px" }} to="/user/earnings ">
                  Earnings
                </Link>
                <Link style={{ marginRight: "45px" }} to="/user/proposals">
                  Proposals
                </Link>
                <Link>{userProfile?.userData?.connects} Credits</Link>

              </>
            ) : user?.userInfo?.userType === "employer" ? (
              <>
                <Link style={{ marginRight: "45px" }} to="/findTalents ">
                  Find talents
                </Link>
                <Link style={{marginRight: '30px'}}>Balance : {employerProfile?.userInfo?.balance}</Link>
                <Link to="/message ">message</Link>
              </>
            ) : (
              <>
                <Link style={{ marginRight: "45px" }} to="admin/users">
                  Users
                </Link>
                <Link style={{ marginRight: "45px" }} to="admin/withdraw">
                  Withdraw request
                </Link>
                <Link style={{ marginRight: "45px" }} to="admin/kyc">
                  Kyc
                </Link>
                <p>s</p>
                <Link to="/message ">message</Link>
              </>
            )}

            <button
              className="btn"
              style={{ backgroundColor: "transparent", color: " #3CCF4E" }}
              id="dropdown-basic"
              onClick={() => setDrop(true)}
            >
              {user?.userInfo?.name}
            </button>

            {drop ? (
              <div onClick={() => setDrop(false)} className="drop-div">
                <ul>
                  <CancelIcon className="cln" />
                  <Link
                    to={
                      user?.userInfo?.userType === "employee"
                        ? "user/profile"
                        : user?.userInfo?.userType === "employer"
                        ? "employer/profile"
                        : "admin/profile"
                    }
                  >
                    profile
                  </Link>
                  <Link onClick={handleLogout}>Logout</Link>
                </ul>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div className="right">
            <button className="btn-1sdf">
              <Link
                style={{ color: "black", textDecoration: "none" }}
                to="/signup"
              >
                SignUp
              </Link>
            </button>
            <button className="btn-2ad">
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/login"
              >
                Login
              </Link>
            </button>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
