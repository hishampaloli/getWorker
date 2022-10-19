import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/UserAction";
import "./header.scss";
import Dropdown from "react-bootstrap/Dropdown";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  deleteMessageEmployee,
  getEmployeeProfile,
} from "../../actions/EmplyeeActions";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CloseIcon from "@mui/icons-material/Close";
import CustomSpinner from "../customSpinner/CustomSpinner";
import { deleteMessageEmployer } from "../../actions/EmployerActions";
import Alert from "@mui/material/Alert";
import { getMyRooms } from "../../actions/chatActions";

const Header = ({socket}) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const [drop, setDrop] = useState(false);
  const [noti, setNoti] = useState(false);
  const userProfile = useSelector((state) => state.employeeData);
  const employerProfile = useSelector((state) => state.employerData);
  const deleteMessage = useSelector((state) => state.deleteMessage);
  const myRooms = useSelector((state) => state.myRooms);

  console.log(myRooms);
  let notis = false;
  let eNotis = false

  myRooms.data?.map(el => {
    if (el?.employerViewed === false) {
      notis = true
    }
  })

  myRooms.data?.map(el => {
    if (el?.employeeViewed === false) {
      eNotis = true
    }
  })

console.log(notis+"><>><><><>>>><><><>");

  useEffect(() => {
    dispatch(getEmployeeProfile());

    dispatch(getMyRooms());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="main-header" style={{ width: "100%" }}>
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

                <Link style={{ marginRight: "15px" }} to="user/message ">
                {eNotis ? <div style={{position: 'absolute', marginLeft: '-10px'}} className="not-ball"></div> :'' }
                  message
                </Link>

                <Link
                  onClick={() => setNoti(!noti)}
                  style={{ marginRight: "45px", position: "relative" }}
                >
                  {userProfile?.userData?.notification.length ? (
                    <div className="not-ball"></div>
                  ) : (
                    ""
                  )}

                  <NotificationsActiveIcon />
                </Link>
                <Link>{userProfile?.userData?.connects} Credits</Link>
              </>
            ) : user?.userInfo?.userType === "employer" ? (
              <>
                <Link style={{ marginRight: "45px" }} to="/findTalents ">
                  Find talents
                </Link>
                <Link style={{ marginRight: "45px" }} to="/employer/recharge ">
                  Recharge
                </Link>

                <Link style={{ marginRight: "15px" }} to="employer/message ">
                {notis ? <div style={{position: 'absolute', marginLeft: '-10px'}} className="not-ball"></div> :'' }
                  message
                </Link>

                <Link style={{ marginRight: "30px" }}>
                  Balance : {employerProfile?.userInfo?.balance}
                </Link>
                <Link
                  onClick={() => setNoti(!noti)}
                  style={{ marginRight: "45px", position: "relative" }}
                >
                  {employerProfile?.userInfo?.notification.length ? (
                    <div className="not-ball"></div>
                  ) : (
                    ""
                  )}

                  <NotificationsActiveIcon />
                </Link>

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

      {noti === true ? (
        <div>
          <div className="drop-div-mgs">
            {user.userInfo?.userType === "employee" ? (
              <ul>
                <CancelIcon onClick={() => setNoti(false)} className="cln" />
                {userProfile.userData
                  ? userProfile?.userData?.notification?.map((message) => {
                      return (
                        <Link>
                          {message?.message}{" "}
                          <CloseIcon
                            onClick={(e) => {
                              dispatch(deleteMessageEmployee(message?._id));
                            }}
                            style={{ cursor: "pointer" }}
                          />
                        </Link>
                      );
                    })
                  : ""}
                {deleteMessage?.loading ? (
                  <div
                    className="m-2"
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {" "}
                    <CustomSpinner />{" "}
                  </div>
                ) : (
                  ""
                )}
                {userProfile?.userData?.notification.length == 0 ? (
                  <Alert severity="info">Oops — no notifications found !</Alert>
                ) : (
                  ""
                )}
              </ul>
            ) : (
              <ul>
                <CancelIcon onClick={() => setNoti(false)} className="cln" />
                {employerProfile.userInfo
                  ? employerProfile?.userInfo?.notification?.map((message) => {
                      return (
                        <Link>
                          {message?.message}{" "}
                          <CloseIcon
                            onClick={(e) => {
                              dispatch(deleteMessageEmployer(message?._id));
                            }}
                            style={{ cursor: "pointer" }}
                          />
                        </Link>
                      );
                    })
                  : ""}
                {deleteMessage?.loading ? (
                  <div
                    className="m-2"
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {" "}
                    <CustomSpinner />{" "}
                  </div>
                ) : (
                  ""
                )}
                {employerProfile?.userInfo?.notification.length == 0 ? (
                  <Alert severity="info">Oops — no notifications found !</Alert>
                ) : (
                  ""
                )}
              </ul>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
