import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import {
  addEducation,
  addLanguageOrSkill,
  addProfileImage,
  deleteEducation,
  deleteLanguageOrSkill,
  getEmployeeProfile,
} from "../../actions/EmplyeeActions";

const ImagePopup = () => {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.employeeData);
  const { userData } = userProfile;

  const [image, setImage] = useState("");

  const [url, setUrl] = useState('');

  const postDetails = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", image);
    data.append('folder', 'GetworkerProfileImg');
    data.append("upload_preset", "getworker");
    const cloud_data = await axios.post("https://api.cloudinary.com/v1_1/dpiah7oyh/image/upload", data)
    setUrl(cloud_data);
    dispatch(addProfileImage(cloud_data?.data?.secure_url))
  };


  return (
    <div>
      <div className="educationPopup">
        <p
          className="common-heading"
          style={{ textAlign: "center", marginLeft: "-30px" }}
        >
          Uploud Image
        </p>

        <form
         
          style={{ marginLeft: "50px", marginTop: "50px" }}
        >
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            placeholder="name of your degree"
          />
          <button onClick={postDetails} type="submit">Add</button>
        </form>
        {userData?.image ? 
        <img src={userData?.image} alt="" /> :  <Spinner animation="border" role="status"></Spinner>}
      </div>
    </div>
  );
};

export default ImagePopup;
