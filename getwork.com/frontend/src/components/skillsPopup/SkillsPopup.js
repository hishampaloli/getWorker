import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import Spinner from "react-bootstrap/Spinner";
import {
  addEducation,
  addLanguageOrSkill,
  deleteEducation,
  deleteLanguageOrSkill,
  getEmployeeProfile,
} from "../../actions/EmplyeeActions";
const SkillsPopup = () => {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.employeeData);
  const [skill, setSkill] = useState("");
  const SkillR = useSelector((state) => state.langNskill);

  const { userData } = userProfile;

  return (
    <div>
      <div className="educationPopup">
        <p
          className="common-heading"
          style={{ textAlign: "center", marginLeft: "-30px" }}
        >
          Skills
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(addLanguageOrSkill('', skill));
          }}
          style={{ marginLeft: "50px", marginTop: "50px" }}
        >

          <input
            type="text"
            onChange={(e) => setSkill(e.target.value)}
            placeholder="name of your degree"
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
            {SkillR?.loading ?  <div style={{display:'flex', justifyContent: 'center', marginBottom: '40px'}}><Spinner animation="border" role="status"></Spinner></div>  : ''}

              {userData?.skills.map((skill) => {
                return (
                  <>
                    <ul style={{ listStyle: "none" }}>
                      <li
                        style={{
                          width: "430px",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                      {skill?.skill}
                        <button
                          onClick={() => {
                           dispatch(deleteLanguageOrSkill('', skill?.skill))
                          }}
                          className="deleteIcon"
                        >
                          <DeleteIcon />{" "}
                        </button>{" "}
                      </li>
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

export default SkillsPopup;
