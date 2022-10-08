import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./protfolioPopup.css";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import Spinner from "react-bootstrap/Spinner";
import {
  addEducation,
  addkyc,
  addLanguageOrSkill,
  addPortfolio,
  deleteEducation,
  deleteLanguageOrSkill,
  getEmployeeProfile,
} from "../../../actions/EmplyeeActions";

const KycPopup = () => {
  const dispatch = useDispatch();

  const gstinformat =
    "^[0-9]{2}[A-Z]{5}[0-9]{4}" + "[A-Z]{1}[1-9A-Z]{1}" + "Z[0-9A-Z]{1}$";

  const userProfile = useSelector((state) => state.employeeData);
  const portfolio = useSelector((state) => state.portfolio);

  const [Image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");

  const [error, setError] = useState("");

  const postDetails = async (e) => {
    e.preventDefault();

    const ImageData = new FormData();
    ImageData.append("file", Image);
    ImageData.append("folder", "GetworkerPortfolio");
    ImageData.append("upload_preset", "getworker");
    const pan_data = await axios.post(
      "https://api.cloudinary.com/v1_1/dpiah7oyh/image/upload",
      ImageData
    );

    console.log(pan_data);

    dispatch(addPortfolio(pan_data?.data?.secure_url, title, description));
  };

  const { userData } = userProfile;

  return (
    <div>
      <div className="portfoilio-Popup">
        <p
          className="common-heading"
          style={{ textAlign: "center", marginLeft: "-30px" }}
        >
          Add Portfolio
        </p>

        <form
          onSubmit={postDetails}
          style={{ marginLeft: "50px", marginTop: "50px" }}
        >
          <div>
            <label htmlFor="">Image of Portfolio</label>
            <input
              className="inp-img"
              required
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div>
            <input
              type="text"
              required
              onChange={(e) => setTitle(e.target.value)}
              placeholder="name of your degree"
              style={{ marginTop: "20px" }}
            />
          </div>

          <div>
            <textarea
              type="text"
              required
              onChange={(e) => setdescription(e.target.value)}
              placeholder="name of your degree"
            />
          </div>

          {portfolio.success ? <p style={{color: '#3ccf4e'}}>successsfully created</p>  : ''}

          {userData.portfolios.length > 3 ? <button style={{width: '260px', backgroundColor: '#ff6c6c'}} disabled='disabled' >You can Only add 4 portfolios</button> : <button  type="submit">Add Portfolio</button> }

          

          {portfolio.loading ? (
            <div style={{display:'flex', justifyContent: 'center',marginLeft: '50px', marginBottom: '40px'}}><Spinner animation="border" role="status"></Spinner></div>
          ) : (
            ""
          )}
        </form>

       
      </div>
    </div>
  );
};

export default KycPopup;
