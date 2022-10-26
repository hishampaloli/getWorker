import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getEmployerProfile } from "../../../actions/EmployerActions";
import EmployerProfile1 from "../../../components/EmployerComponents/EmployerProfile-1/EmployerProfile1";
import "./EmployerProfile.scss";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AllJobs from "../../../components/EmployerComponents/MyJobsComps/AllJobs";
import PurchaseHisrory from "../../../components/EmployeeComponents/ConnectsHelpers/PurchaseHisrory";

const EmployerProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const employerData = useSelector((state) => state.employerData);



  const [ed, setEd] = useState("profile");
  const [show, setShow] = useState(false);

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
      {show ? (
        <ChevronLeftIcon onClick={() => setShow(!show)} className="opn-chev" />
      ) : (
        <ChevronRightIcon onClick={() => setShow(!show)} className="opn-chev" />
      )}

      <div className={show ? "left show" : "left"}>
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
          <button
            className={ed === "profile" ? "btn-a" : "btn"}
            onClick={(e) => {
              setEd("profile")
              setShow(false)
            }}
          >
            My profile
          </button>
          <button
            className={ed === "jobs" ? "btn-a" : "btn"}
            onClick={(e) => {
              setEd("jobs")
              setShow(false)
            } }
          >
            Jobs History
          </button>
          <button
            className={ed === "" ? "btn-a" : "btn"}
            onClick={(e) => {
              setEd("")
              setShow(false)
            } }
          >
            Parchase History
          </button>
        </div>
      </div>

      <div className="right">
        {ed === "profile" ? (
          <EmployerProfile1 employerData={employerData} />
        ) : ed === "jobs" ? (
          <>
          <h3 className="sdf">Completed Jobs</h3>
            <AllJobs jobs={employerData.userInfo?.completedJobs} />
          </>
        ) : (
          <div > <h4 style={{borderBottom: '1px solid #aaaa', padding:'20px'}}>Purchase history</h4> <PurchaseHisrory /></div>
          
        )}
      </div>
    </div>
  );
};

export default EmployerProfile;
