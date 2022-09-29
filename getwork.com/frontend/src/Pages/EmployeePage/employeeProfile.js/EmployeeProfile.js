import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./employeeProfile.css";
import {
  addEducation,
  deleteEducation,
  getEmployeeProfile,
} from "../../../actions/EmplyeeActions";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
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

const EmployeeProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userProfile = useSelector((state) => state.employeeData);
  const user = useSelector((state) => state.user);
  const [ed, setEd] = useState(false);
  const [school, setSchool] = useState("");
  const [title, setTitle] = useState("");

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

  console.log(userData?._id);
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

              <div style={{display: 'flex', alignItems: 'flex-end'}}>
              {userData?.kyc ? <> {userData?.kycApproved ? '': <p><strong>kyc status:</strong> Pending  </p> } </> : <button onClick={(e) => setEd("kycPopup")} >Complete Kyc</button>}
                
                <button>Add payment method</button>
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
          <div className="top">
            <p className="common-heading">Portfolio</p>
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
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={true}
              modules={[EffectCoverflow, Pagination]}
              className="mySwiper"
              style={{ width: "1000px" }}
            >
              <SwiperSlide style={{ height: "200px", width: "400px" }}>
                <img
                  style={{ height: "200px" }}
                  src="https://mbcreative.ca/blog/wp-content/uploads/2020/03/image_processing20200217-904-j9hrxy.png"
                />
              </SwiperSlide>
              <SwiperSlide style={{ height: "200px", width: "400px" }}>
                <img
                  style={{ height: "200px" }}
                  src="https://cdn.dribbble.com/users/1615584/screenshots/15266020/media/48e0cc23ac8f475bdee252226e3b7bf2.jpg?compress=1&resize=400x300&vertical=top"
                />
              </SwiperSlide>
              <SwiperSlide style={{ height: "200px", width: "400px" }}>
                <img
                  style={{ height: "200px" }}
                  src="https://mbcreative.ca/blog/wp-content/uploads/2020/03/yursayurpreview_4x-1024x768.png"
                />
              </SwiperSlide>
              <SwiperSlide style={{ height: "200px", width: "400px" }}>
                <img
                  style={{ height: "200px" }}
                  src="https://www.designer-daily.com/wp-content/uploads/2018/01/storytelling-illustrations.jpg"
                />
              </SwiperSlide>
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
      ) : (
        ""
      )}
    </div>
  );
};

export default EmployeeProfile;
