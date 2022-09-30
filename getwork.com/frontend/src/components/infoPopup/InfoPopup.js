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
      <div className="educationPopUp">
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
        
        >
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder={userData?.userTitle}
          />
          <textarea
            type="text"
            style={{height: '150px'}}
            onChange={(e) => setInfo(e.target.value)}
            className="mt-3"
            placeholder={userData?.userInfo}
          />
          <button type="submit">Add</button>
        </form>

        <ul
        
        >
          {userData ? (
            <>
              {" "}
              <h3>{userData?.userTitle}</h3>
              <p>{userData?.userInfo}</p>
            </>
          ) : (
            <Spinner animation="border" role="status"></Spinner>
          )}
        </ul>
      </div>
    </div>
  );
};

export default InfoPopup;
