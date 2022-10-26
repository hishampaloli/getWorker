import React, { useEffect, useState } from "react";
import "./EmployeeConnects.scss";
import { useDispatch, useSelector } from "react-redux";
import { checkout, myParchaseHistory } from "../../../actions/paymentActions";
import ConnectBox from "../../../components/EmployeeComponents/ConnectsHelpers/ConnectBox";
import PurchaseHisrory from "../../../components/EmployeeComponents/ConnectsHelpers/PurchaseHisrory";
import Paginate from "../../../components/PaginateComponent/Paginate";
import { useNavigate } from "react-router-dom";

const EmployeeConnects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [ed, setEd] = useState("connect");
  const purchaseHistory = useSelector((state) => state.purchaseHistory);

  useEffect(() => {
    if (!user?.userInfo) {
      navigate("/login");
    }
    if (user?.userInfo?.userType === "employer") {
      navigate("/employer/home");
    }
    if (user?.userInfo?.userType === "admin") {
      navigate("/admin/profile");
    }
  },[user, navigate])

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
                user={"employee"}
                number={100}
                amount={500}
                pack={"Basic Pack"}
              />
              <ConnectBox
                user={"employee"}
                number={200}
                amount={1000}
                pack={"Value Pack"}
              />
              <ConnectBox
                user={"employee"}
                number={500}
                amount={5000}
                pack={"Premium Pack"}
              />
            </div>
          ) : (
            <div className="row-1 pb-4" >
              <PurchaseHisrory />
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeConnects;
