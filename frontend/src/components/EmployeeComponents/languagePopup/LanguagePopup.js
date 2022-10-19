import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./languagePopup.css";
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
const LanguagePopup = () => {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.employeeData);
  const LangR = useSelector((state) => state.langNskill);
  const [language, setLanguage] = useState("");

  const { userData } = userProfile;

  return (
    <div style={{ width: "100%" }}>
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
            dispatch(addLanguageOrSkill(language, ""));
          }}
        >
          <input
            type="text"
            required
            onChange={(e) => setLanguage(e.target.value)}
            placeholder="Please enter a language you speak"
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
              {LangR?.loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    height: '40px',
                    width:  '40px',
                  }}
                >
                  <CustomSpinner /> 
                </div>
              ) : (
                ""
              )}
              {userData?.languages.map((language) => {
                return (
                  <div key={language?.language}>
                    <ul style={{ listStyle: "none" }}>
                      <li>{language.language}</li>
                      <button
                        onClick={() => {
                          dispatch(
                            deleteLanguageOrSkill(language.language, "")
                          );
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
            ""
          )}
        </span>
      </div>
    </div>
  );
};

export default LanguagePopup;
