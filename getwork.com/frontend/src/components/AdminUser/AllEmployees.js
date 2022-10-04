import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blockUser, getAllEmplyees } from "../../actions/adminActions";
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';

const AllEmployees = () => {
  const dispatch = useDispatch();

  const Employees = useSelector((state) => state.allEmployees);
  const [keyword, setKeyword] = useState("");
  const [alert, setAlert] = useState(false);

  console.log(Employees);

  useEffect(() => {
    dispatch(getAllEmplyees(keyword));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getAllEmplyees(keyword));
  };
  return (
    <div>

    
      <div className="middle">
      {alert ? 
      <Alert style={{position: 'fixed', top: '30px', right: '50px'}} severity="warning">Loading !</Alert> : ''}
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={(e) => setKeyword(e.target.value)} />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="bottom">
              {Employees
                ? Employees?.data?.map((dt) => {
                    return (
                      <div key={dt?._id} className="talent-result">
                        <div className="t-left">
                          <img
                            src={
                                dt?.employeeData?.image
                                ? dt?.employeeData?.image
                                : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                            }
                            alt=""
                          />
                          <div>
                            <p style={{ color: "#3ccf4e" }}>
                              {dt?.name}
                            </p>
                            {/* <h4>{dt?.userTitle.slice(0, 20)}. . .</h4> */}
                            <p>
                              total earend:{" "}
                              <strong>{dt?.employeeData?.totalEarned}</strong>
                            </p>
                          </div>
                        </div>

                        <div className="t-right">
                          {/* <BookmarkBorderIcon
                            onClick={() => {
                              dispatch(saveTalents(dt?.owner?._id));
                              setAlret(true);
                              setTimeout(() => {
                                setAlret(false);
                              }, 1000);
                            }}
                            style={{ color: "#3ccf4e", cursor: "pointer" }}
                          /> */}
                          <button>
                            {" "}
                            <Link onClick={(e) => {
                                dispatch(blockUser(dt?._id, keyword, dt?.userType))
                                setAlert(true)
                                setTimeout(() => {
                                    setAlert(false)
                                },1500)
                            }}>
                              {" "}
                              {dt?.isBlocked? "unblock": 'block'}
                            </Link>
                          </button>

                          <button>
                            {" "}
                            <Link to={`/user/publicView/${dt?._id}`} >
                              {" "}
                             Profile
                            </Link>
                          </button>
                        </div>
                      </div>
                    );
                  })
                : ""}
            </div>
    </div>
  );
};

export default AllEmployees;
