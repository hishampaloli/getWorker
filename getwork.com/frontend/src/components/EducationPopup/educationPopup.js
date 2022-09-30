import React, { useEffect, useState } from "react";
import "./educationPopup.css";
import { useDispatch, useSelector } from "react-redux";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import Spinner from "react-bootstrap/Spinner";
import {
  addEducation,
  deleteEducation,
  getEmployeeProfile,
} from "../../actions/EmplyeeActions";

const EducationPopup = () => {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.employeeData);
  const educationReq = useSelector((state) => state.education)
  const [school, setSchool] = useState("");
  const [title, setTitle] = useState("");

  const { userData } = userProfile;

  console.log(educationReq);

  

  return (
    <div>
      <div className="educationPopUp">
        <p
          className="common-heading"
          style={{ textAlign: "center", marginLeft: "-30px" }}
        >
          Education
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(addEducation({ school, title }));
          }}
        >
          <input
            className="n"
            type="text"
            onChange={(e) => setSchool(e.target.value)}
            placeholder="school of education"
          />
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="name of your degree"
          />
          <button type="submit">Add</button>
        </form>

        <span className="popUpspan">
          {userData?.educations ? (
            
            <>
            {educationReq.loading ?  <div style={{display:'flex', justifyContent: 'center', marginBottom: '40px'}}><Spinner animation="border" role="status"></Spinner></div>  : ''}
              {userData?.educations.map((education) => {
                return (
                  <>
                    <ul key={education?._id} style={{ listStyle: "none" }}>
                      <p>
                        {" "}
                        <li>
                          <strong>{education?.school}</strong>{" "}
                        </li>{" "}
                        <button
                          onClick={() => {
                            dispatch(
                              deleteEducation(education?._id, userData?.owner)
                            );
                          }}
                          className="deleteIcon"
                        >
                          <DeleteIcon />{" "}
                        </button>{" "}
                      </p>

                      <li>{education?.title}</li>
                    </ul>
                  </>
                );
              })}
            </>
          ) : (
            <Spinner animation="border" role="status"></Spinner>
          )}
        </span>
      </div>
    </div>
  );
};

export default EducationPopup;
