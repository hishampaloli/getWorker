
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllWithdraw } from '../../../actions/adminActions';
import AdminWithDrawComponent from '../../../components/AdminComponents/AdminWithdrawComponent/AdminWithDrawComponent';

const AdminWithdraw = () => {
    
  const [ed, setEd] = useState("kycReq");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const withdrawHistory = useSelector(state => state.withdrawHistory)
  const user = useSelector((state) => state.user);
  const doWidthdrawal = useSelector(state => state.doWidthdrawal);

  console.log(withdrawHistory);

  const pending = withdrawHistory?.data?.filter(el => {
    return el.status === 'pending'
  });

  const completed = withdrawHistory?.data?.filter(el => {
    return el.status !== 'pending'
  })


  useEffect(() => {
    dispatch(getAllWithdraw())
  }, [])
  

  
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
  }, [user, navigate, dispatch]);
  

  return (
    <div className="kyc">
      <div className="kyc-box">
    
     
        {" "}
        <div className="top">
          <button  className={ed === 'kycReq' ? 'bnt' : 'bnt-k'} onClick={() => setEd("kycReq")}>
            Withdraw Requests
          </button>
          <button className={ed === 'acceptedKyc' ? 'bnt' : 'bnt-k'} onClick={() => setEd("acceptedKyc")}>
            History
          </button>
        
        </div>
        <div className="bottom">
          {ed === "kycReq" ? (
            <AdminWithDrawComponent data={pending} />
          ) : ed === "acceptedKyc" ? (
            <AdminWithDrawComponent data={completed}/>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminWithdraw
