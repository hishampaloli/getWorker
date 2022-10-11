import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getEmployerProfile } from "../../../actions/EmployerActions";
import EmployerProfile1 from "../../../components/EmployerComponents/EmployerProfile-1/EmployerProfile1";
import "./EmployerProfile.css";

const EmployerProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const employerData = useSelector((state) => state.employerData);

  const [ed, setEd] = useState("profile");

  console.log(employerData);

  console.log(employerData);
  useEffect(() => {
    if (!user?.userInfo) {
      navigate("/login");
    }
    if (user?.userInfo?.userType === "employee") {
      navigate("/user/home");
    }
    if (user?.userInfo?.userType === "admin") {
      navigate("/admin/profile");
    }

    dispatch(getEmployerProfile());
  }, [user]);


  return (
    <div className="employerProfile">
      <div className="left">
        <div className="left-top">
          {employerData?.userInfo?.image ? (
            <img src={employerData?.userInfo?.image} alt="" />
          ) : (
            <img
              src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
              alt=""
            />
          )}
          <p>{employerData?.userInfo?.owner?.name}</p>
        </div>

        <div className="left-bottom">
          <button className={ed === 'profile' ? 'btn-a' : 'btn'} onClick={(e) => setEd("profile")}>My profile</button>
          <button className={ed === 'jobs' ? 'btn-a' : 'btn'} onClick={(e) => setEd("jobs")}>Jobs History</button>
          <button className={ed === '' ? 'btn-a' : 'btn'} onClick={(e) => setEd("")}>Parchase History</button>
        </div>
      </div>

      <div className="right">
        {ed === "profile" ? (
          <EmployerProfile1 employerData={employerData} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default EmployerProfile;
