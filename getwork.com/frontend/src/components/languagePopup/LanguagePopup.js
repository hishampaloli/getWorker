import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './languagePopup.css'
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
  const LangR = useSelector((state) => state.langNskill);
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
            {LangR?.loading ?  <div style={{display:'flex', justifyContent: 'center', marginBottom: '40px'}}><Spinner animation="border" role="status"></Spinner></div>  : ''}
              {userData?.languages.map((language) => {
                return (
                  <>
                    <ul key={language?.language} style={{ listStyle: "none" }}>
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
            ''
          )}
        </span>
      </div>
    </div>
  );
};

export default LanguagePopup;
