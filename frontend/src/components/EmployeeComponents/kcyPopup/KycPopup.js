import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import Spinner from "react-bootstrap/Spinner";
import {
  addEducation,
  addkyc,
  addLanguageOrSkill,
  deleteEducation,
  deleteLanguageOrSkill,
  getEmployeeProfile,
} from "../../../actions/EmplyeeActions";
import CustomSpinner from "../../customSpinner/CustomSpinner";
const KycPopup = () => {
  const dispatch = useDispatch();

  const gstinformat =
    "^[0-9]{2}[A-Z]{5}[0-9]{4}" + "[A-Z]{1}[1-9A-Z]{1}" + "Z[0-9A-Z]{1}$";

  const userProfile = useSelector((state) => state.employeeData);

  const [aathar, setAathar] = useState("");
  const [aatharSelfie, setAatharSelfie] = useState("");
  const [pan, setPan] = useState("");
  const [gst, setGstNumber] = useState("");

  const [error, setError] = useState("");
  const [load, setLoad] = useState(false);

  const postDetails = async (e) => {
    e.preventDefault();
    setLoad(true);
    if (gst.match(gstinformat)) {
      const athr = new FormData();
      athr.append("file", aathar);
      athr.append("folder", "GetworkerProfileImg");
      athr.append("upload_preset", "getworker");
      const Aathar_data = await axios.post(
        "https://api.cloudinary.com/v1_1/dpiah7oyh/image/upload",
        athr
      );

      const athrSelfie = new FormData();
      athrSelfie.append("file", aatharSelfie);
      athrSelfie.append("folder", "GetworkerProfileImg");
      athrSelfie.append("upload_preset", "getworker");
      const AatharSelfie_data = await axios.post(
        "https://api.cloudinary.com/v1_1/dpiah7oyh/image/upload",
        athrSelfie
      );

      const panD = new FormData();
      panD.append("file", pan);
      panD.append("folder", "GetworkerProfileImg");
      panD.append("upload_preset", "getworker");
      const pan_data = await axios.post(
        "https://api.cloudinary.com/v1_1/dpiah7oyh/image/upload",
        panD
      );

      setLoad(false);
      dispatch(
        addkyc(
          Aathar_data?.data?.secure_url,
          AatharSelfie_data?.data?.secure_url,
          pan_data?.data?.secure_url,
          gst
        )
      );
    } else {
      setLoad(false);
      setError("Invalid gst number");
      return true;
    }
  };

  const { userData } = userProfile;

  return (
    <div>
      <div className="educationPopUp">
        <p
          className="common-heading"
          style={{ textAlign: "center", marginLeft: "-30px" }}
        >
          Add Kyc
        </p>

        <form
          onSubmit={(e) => {}}
          style={{ marginLeft: "50px", marginTop: "50px" }}
        >
          <label htmlFor="">aathar</label>
          <input
            type="file"
            onChange={(e) => setAathar(e.target.files[0])}
            placeholder="name of your degree"
          />

          <label htmlFor="">aatharSelfie</label>
          <input
            type="file"
            onChange={(e) => setAatharSelfie(e.target.files[0])}
            placeholder="name of your degree"
          />

          <label htmlFor="">Pan</label>
          <input
            type="file"
            onChange={(e) => setPan(e.target.files[0])}
            placeholder="name of your degree"
          />

          <label htmlFor="">gstNumber</label>
          <input
            type="text"
            onChange={(e) => setGstNumber(e.target.value)}
            placeholder="Enter a valid GST number"
          />

          {error ? (
            <p className="mt-4" style={{ color: "red" }}>
              {error}
            </p>
          ) : (
            ""
          )}
          {userData?.kyc && userData?.kycApproved === "pending" ? (
            <button onClick={postDetails} disabled="disabled">
              Add
            </button>
          ) : (
            <button onClick={postDetails} type="submit">
              Add
            </button>
          )}
        </form>

        {load ? (
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
        ) : (
          ""
        )}

        {userProfile.loading ? (
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
        ) : (
          <>
            {userData?.kyc && userData?.kycApproved === "pending" ? (
              <h1>Kyc Updated</h1>
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default KycPopup;
