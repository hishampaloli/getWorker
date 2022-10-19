import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editEmployerProfile } from "../../../actions/EmployerActions";
import CustomSpinner from "../../customSpinner/CustomSpinner";

const EmployerProfile1 = ({ employerData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = employerData?.userInfo;
  const changePass = useSelector((state) => state.employerChangePassword);

  const [name, setName] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [load, setload] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image) {
      setload(true);
      const data = new FormData();
      data.append("file", image);
      data.append("folder", "GetworkerProfileImg");
      data.append("upload_preset", "getworker");
      const cloud_data = await axios.post(
        "https://api.cloudinary.com/v1_1/dpiah7oyh/image/upload",
        data
      );
      setUrl(cloud_data);
    }

    setload(false);
    dispatch(editEmployerProfile(name, oldPass, newPass, url?.data?.secure_url));
  };

  return (
    <div className="employerProfile1">
      <div className="top mt-4">
        <div className="min-box">
          <h3>Total Hires</h3>
          <strong> {userData?.hires}</strong>
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#3CCF4E"
              fill-opacity="1"
              d="M0,288L24,282.7C48,277,96,267,144,229.3C192,192,240,128,288,90.7C336,53,384,43,432,32C480,21,528,11,576,37.3C624,64,672,128,720,144C768,160,816,128,864,138.7C912,149,960,203,1008,208C1056,213,1104,171,1152,138.7C1200,107,1248,85,1296,85.3C1344,85,1392,107,1416,117.3L1440,128L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"
            ></path>
          </svg> */}
        </div>

        <div className="min-box">
          <h3>Total Spent</h3>
          <strong> {userData?.totalSpend} </strong>
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#3CCF4E"
              fill-opacity="1"
              d="M0,160L24,176C48,192,96,224,144,240C192,256,240,256,288,245.3C336,235,384,213,432,218.7C480,224,528,256,576,229.3C624,203,672,117,720,74.7C768,32,816,32,864,48C912,64,960,96,1008,128C1056,160,1104,192,1152,186.7C1200,181,1248,139,1296,122.7C1344,107,1392,117,1416,122.7L1440,128L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"
            ></path>
          </svg> */}
        </div>
      </div>

      <div className="bottom">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder={userData?.owner?.name}
            />
            <input type="text" disabled placeholder={userData?.owner?.email} />
          </div>

          <div className="row">
            <input
              type="text"
              onChange={(e) => setOldPass(e.target.value)}
              placeholder="Old Password"
            />
            <input
              type="text"
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="New Password"
            />
          </div>

          <div style={{ width: "100%" }} className="row-l">
            <input
              style={{ width: "100%" }}
              onChange={(e) => setImage(e.target.files[0])}
              className="mt-4"
              type="file"
            />
          </div>

          {changePass?.loading || load ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "40px",
                width: "40px",
                marginTop:"10px"
              }}
            >
              <CustomSpinner  />
            </div>
          ) : (
            ""
          )}
          {changePass?.error ? changePass?.error : ""}
          {changePass?.success && !load ? (
            <p className="mt-3" style={{ color: "#3CCF4E" }}>
              Succussfully Updated
            </p>
          ) : (
            ""
          )}

          <button className="mb-5" type="submit">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployerProfile1;
