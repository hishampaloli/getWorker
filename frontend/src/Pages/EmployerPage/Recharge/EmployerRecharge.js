import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConnectBox from "../../../components/EmployeeComponents/ConnectsHelpers/ConnectBox";
import PurchaseHisrory from "../../../components/EmployeeComponents/ConnectsHelpers/PurchaseHisrory";
import './EmployerRecharge.scss'

const EmployerRecharge = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [ed, setEd] = useState("connect");
  const purchaseHistory = useSelector((state) => state.purchaseHistory);

  useEffect(() => {
    if (!user?.userInfo) {
      navigate("/login");
    }
    if (user?.userInfo?.userType === "employee") {
      navigate("/users/home");
    }
    if (user?.userInfo?.userType === "admin") {
      navigate("/admin/profile");
    }
  }, [user, navigate]);


  return (
    <div className="employeeConnects">
      <div>
        <h2>Buy connects</h2>
      </div>

      <div className="connect-box">
        <div className="right">
          <div className="hed">
            <button
              style={
                ed === "connect"
                  ? { backgroundColor: "#1d4354", color: "white" }
                  : {}
              }
              onClick={() => setEd("connect")}
            >
              Buy Connects
            </button>
            <button
              style={
                ed === "history"
                  ? { backgroundColor: "#1d4354", color: "white" }
                  : {}
              }
              onClick={() => setEd("history")}
            >
              Purchase Hitsory
            </button>
          </div>
          {ed === "connect" ? (
            <div className="row">
              <ConnectBox
                user={"employer"}
                number={100}
                amount={500}
                pack={"Basic Pack"}
              />
              <ConnectBox
                user={"employer"}
                number={200}
                amount={1000}
                pack={"Value Pack"}
              />
              <ConnectBox
                user={"employer"}
                number={500}
                amount={5000}
                pack={"Premium Pack"}
              />
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

export default EmployerRecharge;
