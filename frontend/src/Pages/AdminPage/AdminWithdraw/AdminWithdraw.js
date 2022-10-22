
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllWithdraw } from '../../../actions/adminActions';
import AdminWithDrawComponent from '../../../components/AdminComponents/AdminWithdrawComponent/AdminWithDrawComponent';

const AdminWithdraw = () => {
    
  const [ed, setEd] = useState("kycReq");
  const dispatch = useDispatch();
  const withdrawHistory = useSelector(state => state.withdrawHistory)
  const doWidthdrawal = useSelector(state => state.doWidthdrawal);


  const pending = withdrawHistory?.data?.filter(el => {
    return el.status === 'pending'
  });

  const completed = withdrawHistory?.data?.filter(el => {
    return el.status !== 'pending'
  })


  useEffect(() => {
    dispatch(getAllWithdraw())
  }, [])
  

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
