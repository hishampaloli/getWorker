import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./employeeProfile.scss";
import {
  deletePortfolio,
  getEmployeeProfile,
} from "../../../actions/EmplyeeActions";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper";
import "swiper/css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import EducationPopup from "../../../components/EmployeeComponents/EducationPopup/educationPopup";
import AddIcon from "@mui/icons-material/Add";
import { EffectCoverflow, Pagination } from "swiper";
import { Link, useNavigate } from "react-router-dom";
import LanguagePopup from "../../../components/EmployeeComponents/languagePopup/LanguagePopup";
import SkillsPopup from "../../../components/EmployeeComponents/skillsPopup/SkillsPopup";
import InfoPopup from "../../../components/EmployeeComponents/infoPopup/InfoPopup";
import ImagePopup from "../../../components/EmployeeComponents/profileImgPoprup/ProfileImgPopup";
import KycPopup from "../../../components/EmployeeComponents/kcyPopup/KycPopup";
import PortfoilioPopup from "../../../components/EmployeeComponents/PortfolioPopUp.js/PortfoilioPopup";
import BankPopup from "../../../components/EmployeeComponents/BankdetailsPopup/BankDetailsPopup";
import ChangePasswordPopup from "../../../components/EmployeeComponents/changePasswordPopup/chnagePasswordPopup";
import { CHANGE_PASSWORD_FAIL } from "../../../contants/userConstants";
import { PORTFOLIO_FAIL } from "../../../contants/employeeConstants.js";
import CustomSpinner from "../../../components/customSpinner/CustomSpinner";
import SwipPage from "../../../components/EmployeeComponents/Swiper/SwipPage";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Paginate from "../../../components/PaginateComponent/Paginate";

const EmployeeProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userProfile = useSelector((state) => state.employeeData);
  const portfolio = useSelector((state) => state.portfolio);
  const User = useSelector((state) => state.user);

  const data = userProfile?.userData?.completedJobs;
  const user = useSelector((state) => state.user);
  const [ed, setEd] = useState(false);
  const [title, setTitle] = useState("");
  const [imgUlr, setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const [showPortfolio, setShowPortfolio] = useState("");
  const [Id, setId] = useState("");

  const { userData } = userProfile;

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data?.slice(indexOfFirstPost, indexOfLastPost);

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
    dispatch(getEmployeeProfile());
  }, [user, navigate, dispatch]);

  return (
    <div>
      {userData?.image ? "" : ""}
      {ed ? (
        <CloseIcon
          className="closebtnIcon"
          onClick={(e) => {
            setEd("");
            dispatch({
              type: CHANGE_PASSWORD_FAIL,
            });

            dispatch({
              type: PORTFOLIO_FAIL,
            });
          }}
        />
      ) : (
        ""
      )}

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
              <div className="img-box" onClick={(e) => setEd("imgPopup")}>
                <AddIcon className="addIconHover" />
                {userData?.image ? (
                  <img src={userData?.image} alt="" />
                ) : (
                  <AddIcon className="addIcon" />
                )}
              </div>

              <div>
                {" "}
                <p className="common-heading">{User?.userInfo?.name}</p>
                <p
                  style={{
                    marginLeft: "30px",
                    marginTop: "-10px",
                    fontSize: "14px",
                  }}
                >
                  {User?.userInfo?.email}
                </p>
                <p
                  onClick={(e) => setEd("changePasswordPopup")}
                  style={{
                    marginLeft: "30px",
                    marginTop: "-15px",
                    color: "#3ccf4e",
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                >
                  Change Password ?
                </p>
              </div>
            </div>
            <div className="ep-tp-btn">
              <Link to="/user/connects">
                <button>Buy Credits</button>
              </Link>

              <button>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={`/user/publicView/${userData?.owner?._id}`}
                >
                  Public View
                </Link>
              </button>
            </div>
          </div>

          <div className="bottom">
            <div className="left">
              <div className="left-top">
                <span>
                  <strong>
                    ${userData?.totalEarned?.toString().slice(0, 6)}
                  </strong>
                  <p>Total Earnings</p>
                </span>

                <span>
                  <strong>
                    ${userData?.pendingWithdraw?.toString().slice(0, 6)}
                  </strong>
                  <p>Pending withdraw</p>
                </span>
              </div>

              <div className="left-bottom">
                <span>
                  <h5>
                    Language{" "}
                    <button
                      onClick={() => setEd("langPopup")}
                      className="editIcon"
                    >
                      <EditIcon />
                    </button>
                  </h5>
                  {userData?.languages?.map((language) => {
                    return (
                      <p key={language?.language} style={{ marginLeft: "0px" }}>
                        {language?.language}
                      </p>
                    );
                  })}
                </span>

                <span>
                  <h5>
                    Skills
                    <button
                      onClick={() => setEd("skillPopup")}
                      className="editIcon"
                    >
                      <EditIcon />
                    </button>
                  </h5>

                  {userData?.skills?.map((education) => {
                    return (
                      <li key={education?.skill} style={{ marginLeft: "0px" }}>
                        {education?.skill}
                      </li>
                    );
                  })}
                </span>

                <span>
                  <h5>
                    Education
                    <button
                      onClick={() => setEd("edPopup")}
                      className="editIcon"
                    >
                      <EditIcon />
                    </button>
                  </h5>
                  {userData?.educations?.map((education) => {
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
              <h1 style={{ display: "flex" }}>
                {userData?.userTitle}
                <button
                  onClick={(e) => setEd("infoPopup")}
                  className="editIcon bh"
                >
                  <EditIcon />
                </button>
              </h1>
              <p>
                {userData?.userInfo ? (
                  userData?.userInfo
                ) : (
                  <div>
                    <CustomSpinner />
                  </div>
                )}
              </p>

              <div
                className="kyc-btn-div"
                style={{ display: "flex", alignItems: "flex-end" }}
              >
                {userData?.kyc ? (
                  <>
                    {" "}
                    {userData?.kycApproved === "accepted" ? (
                      <button
                        className="kyc-btn"
                        style={{ backgroundColor: "#3ccf4e" }}
                      >
                        <strong>KYC STATUS :</strong> Accepted
                      </button>
                    ) : userData?.kycApproved === "rejected" ? (
                      <button
                        className="kyc-btn"
                        onClick={(e) => setEd("kycPopup")}
                      >
                        <strong>KYC STATUS :</strong> Rejected
                      </button>
                    ) : (
                      <button
                        className="kyc-btn"
                        style={{ backgroundColor: "#FFC062" }}
                      >
                        <strong>KYC STATUS :</strong> Pending
                      </button>
                    )}{" "}
                  </>
                ) : (
                  <button
                    className="kyc-btn"
                    onClick={(e) => setEd("kycPopup")}
                  >
                    Complete Kyc
                  </button>
                )}

                {userData?.bankDetails ? (
                  <></>
                ) : (
                  <button
                    className="kyc-btn"
                    onClick={() => setEd("bankPopup")}
                  >
                    Add payment method
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="box2 pb-3">
          <div className="top">
            <p className="common-heading">Work History</p>
          </div>

          <div className="body">
            <div style={{ width: "100%" }} className="left">
              {currentPosts?.map((job) => {
                return (
                  <div className="work-div-box">
                    <div>
                      <h4>{job?.title}</h4>
                      <div className="left-text">
                        <strong>${job?.budget}</strong>
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
            <button
              onClick={() => setEd("portfoilioPopup")}
              className="editIco"
            >
              <EditIcon />
            </button>
          </div>
          <div className="bottom">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"4"}
              coverflowEffect={{
                rotate: 80,
                stretch: 10,
                depth: 10,
                modifier: 1,
                slideShadows: false,
              }}
              pagination={true}
              modules={[EffectCoverflow, Pagination]}
              className="mySwiper"
            >
              {userData?.portfolios[0]?.Image ? (
                <SwiperSlide className="swiperImg">
                  <img src={userData?.portfolios[0]?.Image} />
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
                <SwiperSlide className="swiperImg">
                  <img src={userData?.portfolios[1]?.Image} />
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
                <SwiperSlide className="swiperImg">
                  <img src={userData?.portfolios[2]?.Image} />
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
                <SwiperSlide className="swiperImg">
                  <img src={userData?.portfolios[3]?.Image} />
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
          <div>
            <>
              <Swiper
                effect={"cards"}
                grabCursor={true}
                modules={[EffectCards]}
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
                {userData?.portfolios[0]?.Image ? (
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
                {userData?.portfolios[0]?.Image ? (
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
                {userData?.portfolios[0]?.Image ? (
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
            </>
          </div>
        </div>
      </div>

      {ed === "edPopup" ? (
        <EducationPopup />
      ) : ed === "langPopup" ? (
        <LanguagePopup />
      ) : ed === "skillPopup" ? (
        <SkillsPopup />
      ) : ed === "infoPopup" ? (
        <InfoPopup />
      ) : ed === "imgPopup" ? (
        <ImagePopup />
      ) : ed === "kycPopup" ? (
        <KycPopup />
      ) : ed === "bankPopup" ? (
        <BankPopup bankData={userData?.bankDetails} />
      ) : ed == "portfoilioPopup" ? (
        <PortfoilioPopup />
      ) : ed == "changePasswordPopup" ? (
        <ChangePasswordPopup />
      ) : (
        ""
      )}

      {showPortfolio === "portfolio" ? (
        <div className="port-show">
          {" "}
          <CloseIcon
            className="portClose"
            onClick={() => {
              setShowPortfolio("");
            }}
          />
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
            <button
              className="trash-btn"
              onClick={(e) => dispatch(deletePortfolio(Id))}
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default EmployeeProfile;
