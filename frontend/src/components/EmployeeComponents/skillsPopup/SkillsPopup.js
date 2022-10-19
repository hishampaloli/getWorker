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
} from "../../../actions/EmplyeeActions";
import CustomSpinner from "../../customSpinner/CustomSpinner";
const SkillsPopup = () => {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.employeeData);
  const [skill, setSkill] = useState("");
  const SkillR = useSelector((state) => state.langNskill);

  const { userData } = userProfile;

  return (
    <div style={{width: '100%'}}>
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
            dispatch(addLanguageOrSkill("", skill));
          }}
          style={{ marginTop: "50px" }}
        >
          <input
            type="text"
            required
            onChange={(e) => setSkill(e.target.value)}
            placeholder="Enter skill in which you are good at !"
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
              {SkillR?.loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    height: "40px",
                    width: "40px",
                  }}
                >
                  <CustomSpinner />{" "}
                </div>
              ) : (
                ""
              )}

              {userData?.skills.map((skill) => {
                return (
                  <div key={skill?.skill}>
                    <ul style={{ listStyle: "none" }}>
                      <li>
                        {skill?.skill}
                       
                      </li>
                      <button
                          onClick={() => {
                            dispatch(deleteLanguageOrSkill("", skill?.skill));
                          }}
                          className="deleteIcon"
                        >
                          <DeleteIcon />{" "}
                        </button>{" "}
                    </ul>
                  </div>
                );
              })}
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "40px",
                width: "40px",
              }}
            >
              <CustomSpinner />
            </div>
          )}
        </span>
      </div>
    </div>
  );
};

export default SkillsPopup;
