import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import Spinner from "react-bootstrap/Spinner";
import {
  addEducation,
  deleteEducation,
  editInfo,
  getEmployeeProfile,
} from "../../actions/EmplyeeActions";
const InfoPopup = () => {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.employeeData);

  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");

  const { userData } = userProfile;

  return (
    <div>
      <div className="educationPopup">
        <p
          className="common-heading"
          style={{ textAlign: "center", marginLeft: "-30px" }}
        >
          My Info
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(editInfo(title, info));
          }}
          style={{
            marginLeft: "50px",
            marginTop: "50px",
            display: "flex",
            flexDirection: "column",
            padding: "30px",
          }}
        >
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder={userData?.userTitle}
          />
          <textarea
            rows={10}
            cols={100}
            type="text"
            onChange={(e) => setInfo(e.target.value)}
            className="mt-3"
            placeholder={userData?.userInfo}
          />
          <button type="submit">Add</button>
        </form>

        <span
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "40px",
          }}
        >
          {userData ? (
            <>
              {" "}
              <h1>{userData?.userTitle}</h1>
              <h3>{userData?.userInfo}</h3>
            </>
          ) : (
            <Spinner animation="border" role="status"></Spinner>
          )}
        </span>
      </div>
    </div>
  );
};

export default InfoPopup;
