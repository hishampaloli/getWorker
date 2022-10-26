import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminProfile, ParchaseHistory } from "../../../actions/adminActions";
import Spinner from "react-bootstrap/Spinner";
import { PieChart } from "react-minimal-pie-chart";
import "./AdminProfile.scss";
import { changePassword } from "../../../actions/UserAction";
import CustomSpinner from "../../../components/customSpinner/CustomSpinner";
import PurchaseHisrory from "../../../components/EmployeeComponents/ConnectsHelpers/PurchaseHisrory";
import Charts from "../../../components/ChartComponent/Chart";
import RadarChart from "../../../components/ChartComponent/RadarChart";

const AdminProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const Profile = useSelector((state) => state.adminProfile);
  const password = useSelector((state) => state.changePasswords);
  const purchaseHistoryy = useSelector((state) => state.purchaseHistory);


  const [oldPass, setOldPass] = useState("");
  const [showChart, setShowChart] = useState(false);
  const [confirm, setConfirm] = useState("");

  let escrowSum = 0;

  const inEscrow = Profile?.data?.adminData?.adminData?.inEscrow?.map((el) => {
    return (escrowSum = escrowSum + el?.inEscrow);
  });

  useEffect(() => {
    if (!user?.userInfo) {
      navigate("/login");
    }
    if (user?.userInfo?.userType === "employee") {
      navigate("/user/home");
    }
    if (user?.userInfo?.userType === "employer") {
      navigate("/employer/home");
    }

    dispatch(adminProfile());
    dispatch(ParchaseHistory());
  }, [user, navigate, dispatch]);

  return (
    <div className="adminProfile">
      <div className="admin-top">
        

        <div className="right">
          <div className="top">
            <div className="l-box">
              <h3>TOTAL EARNING</h3>
              <strong>
                ₹ {Profile?.data?.adminData?.adminData?.balance}.00
              </strong>
            </div>

            <div className="l-box">
              <h3>CONNECTS SOLD</h3>
              <strong>
                {Profile?.data?.adminData?.adminData?.soldConnect}
              </strong>
            </div>

            <div className="l-box">
              <h3 style={{ color: "#3ccf4e" }}>In Escrow</h3>
              <strong>₹ {escrowSum}.00</strong>
            </div>
          </div>

          <div className="bottom">
            <input type="text" disabled placeholder={user?.userInfo?.email} />

            <form
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(changePassword(oldPass, confirm));
              }}
            >
              <div>
                <input
                  type="password"
                  onChange={(e) => setOldPass(e.target.value)}
                  required
                  placeholder="Old Password"
                />
                {password?.loading ? <CustomSpinner /> : ""}
                <input
                  type="password"
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  placeholder="New Password"
                />
              </div>

              {password?.message ? (
                <p className="mt-3">{password?.message}</p>
              ) : (
                ""
              )}
              <button className="ch-ps-bt">Update Password</button>
            </form>
          </div>
        </div>
      </div>

      <div className="purchase-div">
        <div className="top">
          <h3>All Purchases</h3>
          <button
            onClick={() => {
              setShowChart(!showChart);
            }}
          >
            {showChart ? "Table" : "Charts"}
          </button>
        </div>
        {showChart ? (
          <Charts purchase={purchaseHistoryy} type={'pur'} />
        ) : (
          <PurchaseHisrory />
        )}
      </div>

      <div className="purchase-div">
        <div className="top">
          <h3>User Data</h3>
        </div>
        <Charts purchase={purchaseHistoryy} data={Profile.data} type={'emp'} />
      </div>

      <div className="purchase-div">
        <div className="top">
          <h3>User Data</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column',}} >
        <RadarChart  />
        <ul >
          <li>Finished Withdraw <div style={{backgroundColor: 'rgb(0, 143, 251)'}}></div></li>
          <li>Pending Withdraw <div style={{backgroundColor: 'rgb(0, 227, 150)'}} ></div></li>
          <li>All Withdraw <div  style={{backgroundColor: 'rgb(254, 176, 25)'}}></div></li>
        </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
