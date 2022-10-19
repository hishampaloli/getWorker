import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import Spinner from "react-bootstrap/Spinner";
import {
  addEducation,
  deleteEducation,
  getEmployeeProfile,
} from "../../../actions/EmplyeeActions";
import { changePassword } from "../../../actions/UserAction";
import CustomSpinner from "../../customSpinner/CustomSpinner";

const ChangePasswordPopup = () => {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.employeeData);
  const educationReq = useSelector((state) => state.education);
  const changePasswordR = useSelector((state) => state.changePasswords);
  const [oldPassword, setOldPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(null);

  const { userData } = userProfile;

  console.log(changePasswordR?.message);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlert(false)
    if (newPassword === confirmPassword) {
      dispatch(changePassword(oldPassword, newPassword));
    } else {
      setAlert(true);
    }
  };

  return (
    <div>
      <div className="educationPopUp">
        <p
          className="common-heading"
          style={{ textAlign: "center", marginLeft: "-30px" }}
        >
          Change Password
        </p>

        <form onSubmit={handleSubmit}>
          <input
            className="n"
            type="password"
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Old Password"
            required
          />
          <input
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            required
          />

          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          {changePasswordR?.loading ? (
            <div
              className="mt-4"
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "0px",
              }}
            >
              <CustomSpinner />
            </div>
          ) : (
            ""
          )}
          {alert ? (
            <p className="mt-4">
              New password and confirm password do not match
            </p>
          ) : changePasswordR?.message ? (
            <p className="mt-4">{changePasswordR?.message}</p>
          ) : (
            ""
          )}
          <button type="submit" style={{ color: "white" }}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPopup;
