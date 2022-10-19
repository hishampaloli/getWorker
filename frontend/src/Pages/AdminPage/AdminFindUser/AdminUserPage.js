import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AdminUser.css";
import AllEmployees from "../../../components/AdminComponents/AdminUser/AllEmployees";
import AllEmployers from "../../../components/AdminComponents/AdminUser/AllEmployers";
import BlockedUsers from "../../../components/AdminComponents/AdminUser/BlockedUsers";
import { useNavigate } from "react-router-dom";

const AdminUserPage = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const [ed, setEd] = useState("employee");

  useEffect(() => {
    if (!user?.userInfo) {
      navigate("/login");
    }
    if (user?.userInfo?.userType === "employer") {
      navigate("/employer/home");
    }
    if (user?.userInfo?.userType === "employee") {
      navigate("/employee/profile");
    }
  }, [user]);

  return (
    <div className="adminUserPage">
      <div className="adminUserPage-box">
        <div className="top">
          <button
            className={ed === "employee" ? "btn" : "hbtn"}
            onClick={() => setEd("employee")}
          >
            Employees
          </button>
          <button
            className={ed === "employer" ? "btn" : "hbtn"}
            onClick={() => setEd("employer")}
          >
            Employers
          </button>
          <button
            className={ed === "block" ? "btn" : "hbtn"}
            onClick={() => setEd("block")}
          >
            Blocked Users
          </button>
        </div>

        <div className="bottom">
          {ed === "employee" ? (
            <AllEmployees />
          ) : ed === "employer" ? (
            <AllEmployers />
          ) : ed === "block" ? (
            <BlockedUsers />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUserPage;
