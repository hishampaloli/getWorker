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
const LanguagePopup = () => {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.employeeData);
  const [language, setLanguage] = useState("");

  const { userData } = userProfile;

  return (
    <div>
      <div className="educationPopup">
        <p
          className="common-heading"
          style={{ textAlign: "center", marginLeft: "-30px" }}
        >
          Language
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(addLanguageOrSkill(language, ''));
          }}
          style={{ marginLeft: "50px", marginTop: "50px" }}
        >

          <input
            type="text"
            onChange={(e) => setLanguage(e.target.value)}
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
              {userData?.languages.map((language) => {
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
                      {language.language}
                        <button
                          onClick={() => {
                           dispatch(deleteLanguageOrSkill(language.language, ''))
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

export default LanguagePopup;
