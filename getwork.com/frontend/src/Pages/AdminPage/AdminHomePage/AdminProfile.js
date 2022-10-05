import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminProfile } from "../../../actions/adminActions";
import { PieChart } from "react-minimal-pie-chart";
import "./AdminProfile.css";

const AdminProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const Profile = useSelector((state) => state.adminProfile);

  console.log(Profile?.data?.emplyerLength);

  useEffect(() => {
    if (!user?.userInfo) {
      navigate("/login");
    }
    if (user?.userInfo?.userType === "employee") {
      navigate("/user/home");
    }
    if (user?.userInfo?.userType === "employer") {
      navigate("/employer/home");
    }

    dispatch(adminProfile());
  }, [user]);

  return (
    <div className="adminProfile">
      <div className="left">
        <div className="top">
          <h3>Welcome back</h3>
        </div>

        <div className="bottom">
          <p>
            Employees:{" "}
            <strong>
              {" "}
              {Profile?.data?.emplyerLength ? Profile?.data?.emplyeeLength : ""}
            </strong>
          </p>
          <p>
            Employers:{" "}
            <strong>
              {Profile?.data?.emplyerLength ? Profile?.data?.emplyerLength : ""}
            </strong>{" "}
          </p>
          <p>Jobs Posted: 34</p>
        </div>
      </div>

      <div className="right">
        <div className="top">
          <div className="l-box">
            <h3>TOTAL EARNING</h3>
            <strong>$3094</strong>
          </div>

          <div className="l-box">
            <h3 style={{color: '#3ccf4e'}} >PENDING</h3>
            <strong>$30</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
