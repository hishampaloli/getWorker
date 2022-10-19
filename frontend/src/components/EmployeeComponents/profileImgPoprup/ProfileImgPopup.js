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
} from "../../../actions/EmplyeeActions";
import CustomSpinner from "../../customSpinner/CustomSpinner";

const ImagePopup = () => {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.employeeData);
  const profileImage = useSelector((state) => state.profileImage);

  console.log(profileImage);
  const { userData } = userProfile;

  const [image, setImage] = useState("");
  const [load, setLoad] = useState(false);

  const [url, setUrl] = useState("");

  const postDetails = async (e) => {
    e.preventDefault();
    setLoad(true)
    const data = new FormData();
    data.append("file", image);
    data.append("folder", "GetworkerProfileImg");
    data.append("upload_preset", "getworker");
    const cloud_data = await axios.post(
      "https://api.cloudinary.com/v1_1/dpiah7oyh/image/upload",
      data
    );
    setUrl(cloud_data);
    dispatch(addProfileImage(cloud_data?.data?.secure_url));
    setLoad(false)
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

        <form style={{ marginTop: "50px" }}>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            placeholder="name of your degree"
          />
          <button onClick={postDetails} type="submit">
            Add
          </button>
        </form>
        {load ? <CustomSpinner /> : ''}
        {profileImage?.loading ?  <div style={{display:'flex', justifyContent: 'center', marginBottom: '40px'}}><CustomSpinner /> </div>  : ''}
        {userData?.image ? (
          <img className="mb-5" src={userData?.image} style={{ width: "80%", borderRadius: '25px', maxHeight: '500px' }} alt="" />
        ) : (
          <CustomSpinner /> 
        )}
      </div>
    </div>
  );
};

export default ImagePopup;
