import React, { useEffect, useState } from "react";
import "./EmployeeEarnings.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  withdrawBalance,
  withdrawHistory,
} from "../../../actions/EmplyeeActions";
import Paginate from "../../../components/PaginateComponent/Paginate";
import CustomSpinner from "../../../components/customSpinner/CustomSpinner";

const EmployeeEarnings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ed, setEd] = useState("active");
  const [page, setPage] = useState(1);
  const employeeData = useSelector((state) => state.employeeData);
  const user = useSelector((state) => state.user);
  const withdrawHistoryData = useSelector((state) => state.withdrawHistory);

  console.log(withdrawHistoryData);

  useEffect(() => {
    dispatch(withdrawHistory(page));
  }, [page, dispatch]);

  
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
    
  }, [user, navigate, dispatch]);

  return (
    <div className="postJobs">
      <div className="post-box pb-4">
        <div className="header">
          <button
            style={
              ed === "active"
                ? { backgroundColor: "#1d4354", color: "white" }
                : {}
            }
            onClick={() => setEd("active")}
          >
            Total Earnings
          </button>
          <button
            style={
              ed === "rejected"
                ? { backgroundColor: "#1d4354", color: "white" }
                : {}
            }
            onClick={() => setEd("rejected")}
          >
            Pending Withdraw
          </button>
          <button
            style={
              ed === "shortlisted"
                ? { backgroundColor: "#1d4354", color: "white" }
                : {}
            }
            onClick={() => {
              dispatch(withdrawHistory(page));
              setEd("shortlisted");
            }}
          >
            Withdraw history
          </button>
        </div>
        {/* <form  className="jobs-search">
          <input
            style={{ width: "81%" }}
            type="text"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit">Search</button>
        </form> */}

        <div className="main-body">
          {ed === "active" ? (
            <div className="earn-main-box">
              <div className="earn-box">
                <p>Total Earned</p>
                <strong>₹{employeeData.userData?.totalEarned}.00</strong>
              </div>
            </div>
          ) : ed === "rejected" ? (
            <div className="earn-main-box">
              <div className="earn-box">
                <p>Pending for Withdraw</p>
                <strong>₹{employeeData.userData?.pendingWithdraw}</strong>
              </div>
              {employeeData?.userData?.kycApproved !== "accepted" ? (
                <Link to={`/user/profile`}>
                  <button
                    className="rst-btn mt-2"
                    style={{
                      marginLeft: "5px",
                      backgroundColor: "#FF5454",
                      cursor: "pointer",
                    }}
                  >
                    Complete Kyc
                  </button>
                </Link>
              ) : !employeeData?.userData?.bankDetails ? (
                <Link to={`/user/profile`}>
                  <button
                    className="rst-btn mt-2"
                    style={{
                      marginLeft: "5px",
                      backgroundColor: "#FF5454",
                      cursor: "pointer",
                    }}
                  >
                    Complete payment method
                  </button>
                </Link>
              ) : employeeData.userData?.pendingWithdraw <= 0 ? (
                <button
                  disabled
                  className="rst-btn mt-2"
                  style={{
                    marginLeft: "5px",
                    backgroundColor: "#FF5454",
                    cursor: "not-allowed",
                  }}
                >
                  No balance
                </button>
              ) : (
                <button
                  onClick={() => {
                    dispatch(withdrawBalance());
                  }}
                  className="rst-btn mt-2"
                  style={{ marginLeft: "5px" }}
                >
                  Withdraw balance
                </button>
              )}
            </div>
          ) : ed === "shortlisted" ? (
            <div className="earn-main-box">
              {withdrawHistoryData?.data?.withdraw?.map((history) => {
                return (
                  <div className="withdraw-history">
                    <div>
                      <p>₹{history?.amount}.00</p>
                    </div>

                    <div className="btn-gp">
                      {history.status === "pending" ? (
                        <button
                          style={{ backgroundColor: "#FF5454" }}
                          className="pn-btn"
                        >
                          Pending
                        </button>
                      ) : (
                        <button
                          style={{ backgroundColor: "#75E6FF" }}
                          className="pn-btn"
                        >
                          Success
                        </button>
                      )}

                      <button
                        style={{
                          backgroundColor: "#75E6FF",
                          borderRadius: "50%",
                          width: "50px",
                          height: "50px",
                        }}
                        className="pn-btn knefr"
                      >
                        {" "}
                        <VisibilityIcon />{" "}
                      </button>
                    </div>
                  </div>
                );
              })}
              {withdrawHistoryData?.loading && (
                <div className="mt-5">
                  <CustomSpinner />{" "}
                </div>
              )}
              <div
                className="mt-3"
                style={{ position: "absolute", bottom: "0" }}
              >
              {withdrawHistoryData?.pages && <Paginate
                  count={withdrawHistoryData?.pages}
                  giveBack={setPage}
                />}
                
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeEarnings;
