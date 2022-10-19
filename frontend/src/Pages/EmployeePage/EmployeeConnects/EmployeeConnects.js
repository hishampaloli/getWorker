import React, { useEffect, useState } from "react";
import "./EmployeeConnects.scss";
import { useDispatch, useSelector } from "react-redux";
import { checkout, myParchaseHistory } from "../../../actions/paymentActions";
import ConnectBox from "../../../components/EmployeeComponents/ConnectsHelpers/ConnectBox";
import PurchaseHisrory from "../../../components/EmployeeComponents/ConnectsHelpers/PurchaseHisrory";

const EmployeeConnects = () => {
  const dispatch = useDispatch();

  const [ed, setEd] = useState("connect");
  const purchaseHistory = useSelector((state) => state.purchaseHistory);



  return (
    <div className="employeeConnects">
      <div>
        <h2>Buy connects</h2>
      </div>

      <div className="connect-box">
        <div className="left">
          <button style={ed === 'connect' ? {backgroundColor: '#1d4354', color: "white"} : {}} onClick={() => setEd("connect")}>Buy Connects</button>
          <button style={ed === 'history' ? {backgroundColor: '#1d4354', color: "white"} : {}} onClick={() => setEd("history")}>Purchase Hitsory</button>
        </div>

        <div className="right">
          {ed === "connect" ? (
            <div className="row">
              <ConnectBox number={100} amount={500} pack={"Basic Pack"} />
              <ConnectBox number={200} amount={1000} pack={"Value Pack"} />
              <ConnectBox number={500} amount={5000} pack={"Premium Pack"} />
            </div>
          ) : (
            <div className="row-1">
             <PurchaseHisrory />
                  
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeConnects;
