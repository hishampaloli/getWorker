import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './employeeProfile.css'
import { getEmployeeProfile } from "../../../actions/EmplyeeActions";

const EmployeeProfile = () => {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state);

  useEffect(() => {
    dispatch(getEmployeeProfile())
    console.log(343);
  }, [])

  console.log();
  return <div>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} className="emplyerProfile">

    <div className="box1">
    <div className="top">
      <div className="left">
      <img src="https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/d114e57e9bb9e25a61c5c74ff704e285-1657943919669/ddb8acdc-4465-40ad-be77-29bed61072c9.jpg" alt="" />
      <p>Hisham paloli</p>
      </div>
      <button>Buy Credits</button>
    </div>

    <div className="bottom">
      <div className="left">
        <div className="left-top">
<span>
  <strong>$2434</strong>
  <p>Total Earnings</p>
</span>

<span>
  <strong>$2434</strong>
  <p>Total Earnings</p>
</span>
        </div>

        <div className="left-bottom">

        <span>
          <h5>Language</h5>
          <p>English</p>
        </span>

        <span>
          <h5>Skills</h5>

          <ul>
            <li>figma</li>
            <li>c++</li>
            <li>python</li>
          </ul>
         
        </span>

        <span>
          <h5>Education</h5>
          <p>English</p>
        </span>
        </div>
      </div>


      <div className="right">

      </div>
    </div>
    </div>

    

    </div>
  </div>;
};

export default EmployeeProfile;
