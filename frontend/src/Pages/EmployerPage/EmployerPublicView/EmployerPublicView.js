import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getEmployerProfileData } from "../../../actions/EmployerActions";
import "./EmployerPublicView.scss";
import VisibilityIcon from '@mui/icons-material/Visibility';


const EmployerPublicView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const employerData = useSelector((state) => state.employerData);
  const { userInfo } = employerData;

  useEffect(() => {
    dispatch(getEmployerProfileData(id));
  }, []);
  return (
    <div  className="emplyeeProfile px-3">
      <div className="box1">
        <div className="top">
          <div className="left">
            <div className="img-box">
              {userInfo?.image ? (
                <img src={userInfo?.image} alt="" />
              ) : (
                <img
                  src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                  alt=""
                />
              )}
            </div>

            <div>
              {" "}
              <p className="common-heading">{userInfo?.owner?.name}</p>
              <p
                style={{
                  marginLeft: "30px",
                  marginTop: "-10px",
                  fontSize: "14px",
                  display: "flex",
                }}
              >
                <strong>since :</strong>{" "}
                <span style={{ color: "#3CCF4E", marginLeft: "10px" }}>
                  {userInfo?.owner?.createdAt.slice(0, 10)}
                </span>
              </p>
            </div>
          </div>

         
        </div>

        <div className="bottom">
          <div className="left" style={{display: 'flex'}}>
            <div className="left-top ltpff" style={{display: 'flex'}}  >
              <span>
                <strong> ₹{userInfo?.totalSpend}.00</strong>
                <p>Total Spent</p>
              </span>

              <span>
                <strong>{userInfo?.hires}</strong>
                <p>Total Hires</p>
              </span>
            </div>
          </div>

          <div className="right">
            <div style={{ width: "100%" }}>
              {userInfo?.completedJobs?.map((post) => {
                
                return (
                  <div key={post._id} className="work-div-box-em">
                    <div>
                      <h4>{post?.title}</h4>
                      <div className="left-text">
                        <strong className="mt-4">₹{post?.budget}</strong>
                        <p>Successfully Completed</p>
                      </div>
                    </div>
                    <Link to={`/jobs/${post?._id}`}>
                      {" "}
                      <button style={{ color: "white" }}> <VisibilityIcon /> </button>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerPublicView;
