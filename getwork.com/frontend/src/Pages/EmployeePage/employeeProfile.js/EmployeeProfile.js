import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./employeeProfile.css";
import {
  addEducation,
  deleteEducation,
  deletePortfolio,
  getEmployeeProfile,
} from "../../../actions/EmplyeeActions";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import EducationPopup from "../../../components/EducationPopup/educationPopup";
import Spinner from "react-bootstrap/Spinner";
import AddIcon from "@mui/icons-material/Add";

import { EffectCoverflow, Pagination } from "swiper";
import { useNavigate } from "react-router-dom";
import LanguagePopup from "../../../components/languagePopup/LanguagePopup";
import SkillsPopup from "../../../components/skillsPopup/SkillsPopup";
import InfoPopup from "../../../components/infoPopup/InfoPopup";
import ImagePopup from "../../../components/profileImgPoprup/ProfileImgPopup";
import KycPopup from "../../../components/kcyPopup/KycPopup";
import PortfoilioPopup from "../../../components/PortfolioPopUp.js/PortfoilioPopup";
import BankPopup from "../../../components/BankdetailsPopup/BankDetailsPopup";

const EmployeeProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userProfile = useSelector((state) => state.employeeData);
  const user = useSelector((state) => state.user);
  const [ed, setEd] = useState(false);
  const [title, setTitle] = useState("");
  const [imgUlr, setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const [showPortfolio, setShowPortfolio] = useState("");
  const [Id, setId] = useState("");

  const { userData } = userProfile;

  useEffect(() => {
    if (!user?.userInfo) {
      navigate("/login");
    }
    if (user?.userInfo?.userType === "employer") {
      navigate("/employer/home");
    }
    dispatch(getEmployeeProfile());
  }, [user]);

  
  return (
    <div>
      {ed ? (
        <CloseIcon className="closebtnIcon" onClick={(e) => setEd("")} />
      ) : (
        ""
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        className="emplyerProfile"
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

              <p className="common-heading">Hisham paloli</p>
            </div>
            <button>Buy Credits</button>
          </div>

          <div className="bottom">
            <div className="left">
              <div className="left-top">
                <span>
                  <strong>$2434</strong>
                  <p>Total Earnings</p>
                </span>

                <span>
                  <strong>$2434</strong>
                  <p>Total Earnings</p>
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
                  {userData?.languages.map((language) => {
                    return (
                      <p style={{ marginLeft: "0px" }}>{language?.language}</p>
                    );
                  })}
                </span>

                <span>
                  <h5>
                    Skills{" "}
                    <button
                      onClick={() => setEd("skillPopup")}
                      className="editIcon"
                    >
                      <EditIcon />
                    </button>
                  </h5>

                  {userData?.skills.map((education) => {
                    return (
                      <li style={{ marginLeft: "0px" }}>{education?.skill}</li>
                    );
                  })}
                </span>

                <span>
                  <h5>
                    Education{" "}
                    <button
                      onClick={() => setEd("edPopup")}
                      className="editIcon"
                    >
                      <EditIcon />
                    </button>
                  </h5>
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
              <h1 style={{ display: "flex" }}>
                Experienced web developer with hands-on-projects{" "}
                <button
                  onClick={(e) => setEd("infoPopup")}
                  className="editIcon bh"
                >
                  <EditIcon />
                </button>
              </h1>
              <p>
                Need a brand new website, an overhaul to your existing website,
                or just a few updates? Then let's talk. Whether you're an
                entrepreneur who needs a personal portfolio, a small to mid-size
                business owner who needs to strengthen their brand and services,
                or just somebody who has an idea that needs a web presence, I
                can take care of it for you 👇.
              </p>

              <div style={{ display: "flex", alignItems: "flex-end" }}>
                {userData?.kyc ? (
                  <>
                    {" "}
                    {userData?.kycApproved ? (
                      ""
                    ) : (
                      <p>
                        <strong>kyc status:</strong> Pending{" "}
                      </p>
                    )}{" "}
                  </>
                ) : (
                  <button onClick={(e) => setEd("kycPopup")}>
                    Complete Kyc
                  </button>
                )}

                <button onClick={() => setEd("bankPopup")}>
                  Add payment method
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="box2">
          <div className="top">
            <p className="common-heading">Work History</p>
          </div>

          <div className="body">
            <div className="left">
              <h4>Make a website</h4>
              <div className="left-text">
                <strong>$25.00</strong>
                <p>Successfully Completed</p>
              </div>
            </div>

            <button>ee</button>
          </div>
        </div>

        <div className="box3">
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
                      setId(userData?.portfolios[0]?._id)
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
                      setId(userData?.portfolios[1]?._id)
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
                      setId(userData?.portfolios[2]?._id)
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
        <BankPopup />
      ) : ed == "portfoilioPopup" ? (
        <PortfoilioPopup />
      ) : (
        ""
      )}

      {showPortfolio === "portfolio" ? (
        <div className="port-show">
          <div>
            {" "}
            <CloseIcon
              className="portClose"
              onClick={() => setShowPortfolio("")}
            />
          </div>

          <img src={imgUlr} alt="" />
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div>
              <h3 className="mt-5">
                <strong>Title :</strong> {title}
              </h3>
              <p>
                <strong>Description :</strong> {description}
              </p>
            </div>
            <button className="trash-btn" onClick={(e) => dispatch(deletePortfolio(Id))} ><DeleteIcon  /></button>
            
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default EmployeeProfile;
