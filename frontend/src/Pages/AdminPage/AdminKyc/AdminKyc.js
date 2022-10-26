import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllKyc } from "../../../actions/adminActions";
import AdminAcceptedKyc from "../../../components/AdminComponents/AdminKyc/AdminAcceptedKyc";
import AdminAllKyc from "../../../components/AdminComponents/AdminKyc/AdminAllKyc";
import AdminRejected from "../../../components/AdminComponents/AdminKyc/AdminRejected";
import Alert from '@mui/material/Alert';
import "./AdminKyc.css";
import { useNavigate } from "react-router-dom";

const AdminKyc = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const kyc = useSelector((state) => state.allKyc);
  const kycStatus = useSelector((state) => state.kycReq);
  
    
  const user = useSelector((state) => state.user);

  const kycRequest = kyc?.data?.filter((el) => {
    return el.kycStatus === "pending";
  });

  const rejectedKyc = kyc?.data?.filter((el) => {
    return el.kycStatus === "rejected";
  });

  const acceptedKyc = kyc?.data?.filter((el) => {
    return el.kycStatus === "accepted";
  });


  const [ed, setEd] = useState("kycReq");

  useEffect(() => {
    if (!user?.userInfo) {
      navigate("/login");
    }
    if (user?.userInfo?.userType === "employer") {
      navigate("/employer/home");
    }
    if (user?.userInfo?.userType === "employee") {
      navigate("/employee/profile");
    }
    dispatch(getAllKyc());

  }, [user, navigate,dispatch]);


  return (
    <div className="kyc">
      <div className="kyc-box">
    
     
        {" "}
        <div className="top">
          <button  className={ed === 'kycReq' ? 'bnt' : 'bnt-k'} onClick={() => setEd("kycReq")}>
            Kyc request
          </button>
          <button className={ed === 'acceptedKyc' ? 'bnt' : 'bnt-k'} onClick={() => setEd("acceptedKyc")}>
            Accepted Kyc
          </button>
          <button className={ed === 'block' ? 'bnt' : 'bnt-k'} onClick={() => setEd("block")}>
            Rejected Kyc
          </button>
        </div>
        <div className="bottom">
          {ed === "kycReq" ? (
            <AdminAllKyc kycRequest={kycRequest} />
          ) : ed === "acceptedKyc" ? (
            <AdminAcceptedKyc acceptedRequest={acceptedKyc} />
          ) : ed === "block" ? (
            <AdminRejected rejectedRequest={rejectedKyc} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminKyc;
