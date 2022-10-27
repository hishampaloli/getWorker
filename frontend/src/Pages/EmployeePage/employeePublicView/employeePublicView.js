import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeProfileView } from "../../../actions/EmplyeeActions";
import "../employeeProfile.js/employeeProfile.scss";
import { EffectCards } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import "swiper/css/effect-coverflow";
import CloseIcon from "@mui/icons-material/Close";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper";
import { Link, useNavigate, useParams } from "react-router-dom";
import SwipPage from "../../../components/EmployeeComponents/Swiper/SwipPage";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Paginate from "../../../components/PaginateComponent/Paginate";

const EmployeePublicView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { userId } = useParams();

  const userProfile = useSelector((state) => state.emplyeePublicData);

  const data = userProfile?.userData?.completedJobs;
  const user = useSelector((state) => state.user);
  const [title, setTitle] = useState("");
  const [imgUlr, setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const [showPortfolio, setShowPortfolio] = useState("");
  const [Id, setId] = useState("");

  const { userData } = userProfile;

  console.log(userProfile.userData?.completedJobs.length);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data?.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    if (!user?.userInfo) {
      navigate("/login");
    }
    dispatch(getEmployeeProfileView(userId));
  }, [user]);

  return (
    <div>
      {userProfile?.error ? (
        <div
          style={{
            width: "100%",
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="https://cdn.dribbble.com/users/1554526/screenshots/3399669/media/51c98501bc68499ed0220e1ba286eeaf.png?compress=1&resize=400x300&vertical=top"
            alt=""
          />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className="emplyeeProfile"
        >
          <div className="box1">
            <div className="top">
              <div className="left">
                <div className="img-box">
                  {userData?.image ? (
                    <img src={userData?.image} alt="" />
                  ) : (
                    <img
                      src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                      alt=""
                    />
                  )}
                </div>

                <div>
                  {" "}
                  <p className="common-heading">{userData?.owner?.name}</p>
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
                      {userData?.owner?.createdAt.slice(0, 10)}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bottom">
              <div className="left">
                <div className="left-top">
                  <span>
                    <strong>₹{userData?.totalEarned}.00</strong>
                    <p>Total Earnings</p>
                  </span>

                  <span>
                    <strong>{userProfile.userData?.completedJobs.length || 0}</strong>
                    <p>Total Jobs</p>
                  </span>
                </div>

                <div className="left-bottom">
                  <span>
                    {userData?.languages.length ? <h5>Language</h5> : ""}

                    {userData?.languages.map((language) => {
                      return (
                        <p
                          key={language?.language}
                          style={{ marginLeft: "0px" }}
                        >
                          {language?.language}
                        </p>
                      );
                    })}
                  </span>

                  <span>
                    {userData?.skills.length ? <h5>Skills </h5> : ""}

                    {userData?.skills.map((education) => {
                      return (
                        <li
                          key={education?.skill}
                          style={{ marginLeft: "0px" }}
                        >
                          {education?.skill}
                        </li>
                      );
                    })}
                  </span>

                  <span>
                    {userData?.educations.length ? <h5>Education </h5> : ""}
                    {userData?.educations.map((education) => {
                      return (
                        <ul key={education?._id}>
                          <li>
                            <strong>{education?.school}</strong>{" "}
                          </li>
                          <li>{education?.title}</li>
                        </ul>
                      );
                    })}
                  </span>
                </div>
              </div>

              <div className="right">
                <h1>{userData?.userTitle}</h1>
                <p>{userData?.userInfo}</p>
              </div>
            </div>
          </div>

          <div className="box2 pb-3">
            <div className="top">
              <p className="common-heading">Work History</p>
            </div>

            <div className="body">
              <div style={{ width: "100%" }} className="left">
              
              {currentPosts?.length  ? '': <p style={{textAlign: 'center'}}>No completed Jobs</p> }
                {currentPosts?.map((job) => {
                  return (
                    <div key={job._id} className="work-div-box">
                      <div>
                        <h4>{job?.title}</h4>
                        <div className="left-text">
                          <strong>₹{job?.budget}</strong>
                          <p>Successfully Completed</p>
                        </div>
                      </div>
                      <Link to={`/jobs/${job?._id}`}>
                        {" "}
                        <button style={{ color: "white" }}>
                          {" "}
                          <VisibilityIcon />{" "}
                        </button>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
            {currentPosts && (
            <Paginate
              count={Math.ceil(data?.length / postsPerPage)}
              giveBack={setCurrentPage}
            />
          )}
          </div>

          <div className="box3 mb-5">
            <div className="top" style={{ display: "flex" }}>
              <p className="common-heading">Portfolio</p>
            </div>
            <div className="bottom">
            {userData?.portfolios[0]?.Image ? '' : <p>No portfolios</p> }
              <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"4"}
                coverflowEffect={{
                  rotate: 80,
                  stretch: 0,
                  depth: 10,
                  modifier: 1,
                  slideShadows: false,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
                style={{ width: "1000px" }}
              >
                {userData?.portfolios[0]?.Image ? (
                  <SwiperSlide
                    style={{
                      height: "350px",
                      width: "200px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    className="swiperImg"
                  >
                    <img
                      style={{ height: "200px", width: "200px" }}
                      src={userData?.portfolios[0]?.Image}
                    />
                    <button
                      onClick={() => {
                        setTitle(userData?.portfolios[0]?.title);
                        setDescription(userData?.portfolios[0]?.description);
                        setShowPortfolio("portfolio");
                        setImgUrl(userData?.portfolios[0]?.Image);
                        setId(userData?.portfolios[0]?._id);
                      }}
                      style={{ marginLeft: "0px" }}
                      className="editIco mt-2 mb-2"
                    >
                      <RemoveRedEyeIcon />
                    </button>
                  </SwiperSlide>
                ) : (
                  ""
                )}

                {userData?.portfolios[1]?.Image ? (
                  <SwiperSlide
                    style={{
                      height: "350px",
                      width: "200px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    className="swiperImg"
                  >
                    <img
                      style={{ height: "200px", width: "200px" }}
                      src={userData?.portfolios[1]?.Image}
                    />
                    <button
                      onClick={() => {
                        setTitle(userData?.portfolios[1]?.title);
                        setDescription(userData?.portfolios[1]?.description);
                        setShowPortfolio("portfolio");
                        setImgUrl(userData?.portfolios[1]?.Image);
                        setId(userData?.portfolios[1]?._id);
                      }}
                      style={{ marginLeft: "0px" }}
                      className="editIco mt-2 mb-2"
                    >
                      <RemoveRedEyeIcon />
                    </button>
                  </SwiperSlide>
                ) : (
                  ""
                )}

                {userData?.portfolios[2]?.Image ? (
                  <SwiperSlide
                    style={{
                      height: "350px",
                      width: "200px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    className="swiperImg"
                  >
                    <img
                      style={{ height: "200px", width: "200px" }}
                      src={userData?.portfolios[2]?.Image}
                    />
                    <button
                      onClick={() => {
                        setTitle(userData?.portfolios[2]?.title);
                        setDescription(userData?.portfolios[2]?.description);
                        setShowPortfolio("portfolio");
                        setImgUrl(userData?.portfolios[2]?.Image);
                        setId(userData?.portfolios[2]?._id);
                      }}
                      style={{ marginLeft: "0px" }}
                      className="editIco mt-2 mb-2"
                    >
                      <RemoveRedEyeIcon />
                    </button>
                  </SwiperSlide>
                ) : (
                  ""
                )}

                {userData?.portfolios[3]?.Image ? (
                  <SwiperSlide
                    style={{
                      height: "350px",
                      width: "200px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    className="swiperImg"
                  >
                    <img
                      style={{ height: "200px", width: "200px" }}
                      src={userData?.portfolios[3]?.Image}
                    />
                    <button
                      onClick={() => {
                        setTitle(userData?.portfolios[3]?.title);
                        setDescription(userData?.portfolios[3]?.description);
                        setShowPortfolio("portfolio");
                        setImgUrl(userData?.portfolios[3]?.Image);
                        setId(userData?.portfolios[3]?._id);
                      }}
                      style={{ marginLeft: "0px" }}
                      className="editIco mt-2 mb-2"
                    >
                      <RemoveRedEyeIcon />
                    </button>
                  </SwiperSlide>
                ) : (
                  ""
                )}
              </Swiper>
            </div>
            <Swiper
              effect={"cards"}
              grabCursor={true}
              // modules={[EffectCards]}
              className="mySwipe"
            >
              {userData?.portfolios[0]?.Image ? (
                <SwiperSlide>
                  <img
                    className="swp-img"
                    src={userData?.portfolios[0]?.Image}
                    alt=""
                  />{" "}
                  <button
                    onClick={() => {
                      setTitle(userData?.portfolios[0]?.title);
                      setDescription(userData?.portfolios[0]?.description);
                      setShowPortfolio("portfolio");
                      setImgUrl(userData?.portfolios[0]?.Image);
                      setId(userData?.portfolios[0]?._id);
                    }}
                    style={{ marginLeft: "0px" }}
                    className="editIco mt-2 mb-2"
                  >
                    <RemoveRedEyeIcon />
                  </button>
                </SwiperSlide>
              ) : (
                ""
              )}
              {userData?.portfolios[1]?.Image ? (
                <SwiperSlide className="swp-cls">
                  <img
                    className="swp-img"
                    src={userData?.portfolios[1]?.Image}
                    alt=""
                  />{" "}
                  <button
                    onClick={() => {
                      setTitle(userData?.portfolios[1]?.title);
                      setDescription(userData?.portfolios[1]?.description);
                      setShowPortfolio("portfolio");
                      setImgUrl(userData?.portfolios[1]?.Image);
                      setId(userData?.portfolios[1]?._id);
                    }}
                    style={{ marginLeft: "0px" }}
                    className="editIco mt-2 mb-2"
                  >
                    <RemoveRedEyeIcon />
                  </button>
                </SwiperSlide>
              ) : (
                ""
              )}
              {userData?.portfolios[2]?.Image ? (
                <SwiperSlide>
                  <img
                    className="swp-img"
                    src={userData?.portfolios[2]?.Image}
                    alt=""
                  />{" "}
                  <button
                    onClick={() => {
                      setTitle(userData?.portfolios[2]?.title);
                      setDescription(userData?.portfolios[2]?.description);
                      setShowPortfolio("portfolio");
                      setImgUrl(userData?.portfolios[2]?.Image);
                      setId(userData?.portfolios[2]?._id);
                    }}
                    style={{ marginLeft: "0px" }}
                    className="editIco mt-2 mb-2"
                  >
                    <RemoveRedEyeIcon />
                  </button>
                </SwiperSlide>
              ) : (
                ""
              )}
              {userData?.portfolios[3]?.Image ? (
                <SwiperSlide>
                  <img
                    className="swp-img"
                    src={userData?.portfolios[3]?.Image}
                    alt=""
                  />{" "}
                  <button
                    onClick={() => {
                      setTitle(userData?.portfolios[3]?.title);
                      setDescription(userData?.portfolios[3]?.description);
                      setShowPortfolio("portfolio");
                      setImgUrl(userData?.portfolios[3]?.Image);
                      setId(userData?.portfolios[3]?._id);
                    }}
                    style={{ marginLeft: "0px" }}
                    className="editIco mt-2 mb-2"
                  >
                    <RemoveRedEyeIcon />
                  </button>
                </SwiperSlide>
              ) : (
                ""
              )}
              <p style={{ marginLeft: "100px", color: "#75E6FF" }}>
                {"swip >"}
              </p>
            </Swiper>
          </div>
        </div>
      )}

      {showPortfolio === "portfolio" ? (
        <div className="port-show">
          {/* <div> */}{" "}
          <CloseIcon
            className="portClose"
            onClick={() => {
              setShowPortfolio("");
            }}
          />
          {/* </div> */}
          <img src={imgUlr} alt="" />
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <h3 className="mt-5">
                <strong>Title :</strong> {title}
              </h3>
              <p>
                <strong>Description :</strong> {description}
              </p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default EmployeePublicView;
