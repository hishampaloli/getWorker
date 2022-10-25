import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/UserAction";
import "./header.scss";
import CancelIcon from "@mui/icons-material/Cancel";
import MenuIcon from "@mui/icons-material/Menu";
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

const Header = ({ socket }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const [drop, setDrop] = useState(false);
  const [noti, setNoti] = useState(false);
  const userProfile = useSelector((state) => state.employeeData);
  const employerProfile = useSelector((state) => state.employerData);
  const deleteMessage = useSelector((state) => state.deleteMessage);
  const myRooms = useSelector((state) => state.myRooms);

  const [small, setSmall] = useState(false);

  if (
    document.querySelectorAll("a").forEach((el) => {
      el.addEventListener("click", () => {
        setSmall(false);
      });
    })
  ) {
  }

  let notis = false;
  let eNotis = false;

  myRooms.data?.map((el) => {
    if (el?.employerViewed === false) {
      notis = true;
    }
    return 0;
  });

  myRooms.data?.map((el) => {
    if (el?.employeeViewed === false) {
      eNotis = true;
    }
    return 0;
  });

  useEffect(() => {
    if (user.userInfo?.userType === "employee") {
      dispatch(getEmployeeProfile());
    }

    dispatch(getMyRooms());
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="main-header" style={{ width: "100%" }}>
      <header>
        <div className="left" style={{ display: "flex" }}>
          <Link style={{ color: "white", textDecoration: "none" }} to="/">
            <h2>GETWORKER</h2>
          </Link>
        </div>

{!user ? '' : <div className="ham">
          <MenuIcon onClick={() => setSmall(!small)} fontSize="large" />
        </div> }
        

        {user?.userInfo?._id ? (
          <>
            <div className={!small ? "right big-nav " : "right  small-nav"}>
              {user?.userInfo?.userType === "employee" ? (
                <>
                  <Link to="/user/myjobs ">My Jobs</Link>

                  <Link to="/user/earnings ">Earnings</Link>
                  <Link to="/user/proposals">Proposals</Link>

                  <Link to="user/message ">
                    {eNotis ? (
                      <div
                        style={{ position: "absolute" }}
                        className="not-ball"
                      ></div>
                    ) : (
                      ""
                    )}
                    message
                  </Link>

                  <Link
                    onClick={() => setNoti(!noti)}
                    style={{ position: "relative" }}
                  >
                    {userProfile?.userData?.notification?.length ? (
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
                  <Link to="/findTalents ">Find talents</Link>
                  <Link to="/employer/recharge ">Recharge</Link>

                  <Link to="employer/message ">
                    {notis ? (
                      <div
                        style={{ position: "absolute", marginLeft: "-10px" }}
                        className="not-ball"
                      ></div>
                    ) : (
                      ""
                    )}
                    message
                  </Link>

                  <Link>Balance : {employerProfile?.userInfo?.balance}</Link>
                  <Link
                    onClick={() => setNoti(!noti)}
                    style={{ position: "relative" }}
                  >
                    {employerProfile?.userInfo?.notification.length ? (
                      <div className="not-ball"></div>
                    ) : (
                      ""
                    )}

                    <NotificationsActiveIcon />
                  </Link>
                </>
              ) : (
                <>
                  <Link to="admin/users">Users</Link>
                  <Link to="admin/withdraw">Withdraw request</Link>
                  <Link to="admin/kyc">Kyc</Link>
                  <p>s</p>
                  <Link to="admin/message ">message</Link>
                </>
              )}
            </div>

            <button
              className="btn"
              style={{ backgroundColor: "transparent", color: " #3CCF4E", marginRight: '30px' }}
              onClick={() => setDrop(true)}
            >
              {user?.userInfo?.name}
            </button>
          </>
        ) : (
          <div className="right">
            <button className="btn-1sdf">
              <Link
                style={{  textDecoration: "none" }}
                to="/signup"
              >
                SignUp
              </Link>
            </button>
            <button className="btn-2ad">
              <Link
                style={{
                  textDecoration: "none",
                }}
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
                  ? userProfile?.userData?.notification?.map((message, idx) => {
                      return (
                        <Link style={{ textDecoration: "none" }} key={idx}>
                          {message?.message}{" "}
                          <CloseIcon
                            onClick={(e) => {
                              dispatch(deleteMessageEmployee(message?._id));
                            }}
                            style={{
                              cursor: "pointer",
                              color: "#FF5454",
                              backgroundColor: "white",
                              borderRadius: "50%",
                              padding: "2px",
                            }}
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
                {userProfile?.userData?.notification.length === 0 ? (
                  <Alert severity="info">Oops — no notifications found !</Alert>
                ) : (
                  ""
                )}
              </ul>
            ) : (
              <ul>
                <CancelIcon onClick={() => setNoti(false)} className="cln" />
                {employerProfile.userInfo
                  ? employerProfile?.userInfo?.notification?.map(
                      (message, idx) => {
                        return (
                          <Link style={{ textDecoration: "none" }} key={idx}>
                            {message?.message}{" "}
                            <CloseIcon
                              onClick={(e) => {
                                dispatch(deleteMessageEmployer(message?._id));
                              }}
                              style={{ cursor: "pointer" }}
                            />
                          </Link>
                        );
                      }
                    )
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
                    <CustomSpinner />
                  </div>
                ) : (
                  ""
                )}
                {employerProfile?.userInfo?.notification.length === 0 ? (
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
            <Link to={'/help'}>Help</Link>
            <Link onClick={handleLogout}>Logout</Link>
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
