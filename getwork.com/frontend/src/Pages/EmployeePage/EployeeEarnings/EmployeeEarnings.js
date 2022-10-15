import React, { useState } from "react";
import "./EmployeeEarnings.scss";
import VisibilityIcon from '@mui/icons-material/Visibility';

const EmployeeEarnings = () => {
  const [ed, setEd] = useState("active");

  return (
    <div className="postJobs">
      <div className="post-box">
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
            onClick={() => setEd("shortlisted")}
          >
            Withdraw history & Status
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
                <strong>$0</strong>
              </div>
            </div>
          ) : ed === "rejected" ? (
            <div className="earn-main-box">
              <div className="earn-box">
                <p>Pending for Withdraw</p>
                <strong>$0</strong>
              </div>
              <button className="rst-btn" >Request Withdraw</button>
            </div>
          ) : ed === "shortlisted" ? (
            <div className="earn-main-box">
             <div className="withdraw-history">
             <div>
                <p>$100.00</p>
             </div>

             <div className="btn-gp" >
             <button style={{backgroundColor: '#FF5454'}} className="pn-btn">Pending</button>
             <button style={{backgroundColor: '#75E6FF'}}  className="pn-btn">Success</button>
             <button style={{backgroundColor: '#75E6FF', borderRadius: '50%', width: '50px', height: '50px'}}  className="pn-btn knefr"> <VisibilityIcon /> </button>
             </div>
             
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
