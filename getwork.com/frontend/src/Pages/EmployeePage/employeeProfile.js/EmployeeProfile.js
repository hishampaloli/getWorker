import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./employeeProfile.css";
import { getEmployeeProfile } from "../../../actions/EmplyeeActions";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { EffectCoverflow, Pagination } from "swiper";

const EmployeeProfile = () => {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state);

  useEffect(() => {
    dispatch(getEmployeeProfile());
    console.log(343);
  }, []);

  console.log();
  return (
    <div>
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
              <img
                src="https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/d114e57e9bb9e25a61c5c74ff704e285-1657943919669/ddb8acdc-4465-40ad-be77-29bed61072c9.jpg"
                alt=""
              />
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
                  <h5>Language</h5>
                  <p>English</p>
                </span>

                <span>
                  <h5>Skills</h5>

                  <ul>
                    <li>figma</li>
                    <li>c++</li>
                    <li>python</li>
                  </ul>
                </span>

                <span>
                  <h5>Education</h5>
                  <p>English</p>
                </span>
              </div>
            </div>

            <div className="right">
              <h1>Experienced web developer with hands-on-projects</h1>
              <p>
                Need a brand new website, an overhaul to your existing website,
                or just a few updates? Then let's talk. Whether you're an
                entrepreneur who needs a personal portfolio, a small to mid-size
                business owner who needs to strengthen their brand and services,
                or just somebody who has an idea that needs a web presence, I
                can take care of it for you 👇.
              </p>

              <div>
                <button>Complete Kyc</button>
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
        style={{width: '1000px'}}
      >
        <SwiperSlide style={{height: "200px", width: '400px'}}>
          <img style={{height: "200px"}}  src="https://mbcreative.ca/blog/wp-content/uploads/2020/03/image_processing20200217-904-j9hrxy.png" />
        </SwiperSlide >
        <SwiperSlide  style={{height: "200px", width: '400px'}}>
          <img style={{height: "200px"}} src="https://cdn.dribbble.com/users/1615584/screenshots/15266020/media/48e0cc23ac8f475bdee252226e3b7bf2.jpg?compress=1&resize=400x300&vertical=top" />
        </SwiperSlide>
        <SwiperSlide  style={{height: "200px", width: '400px'}}>
          <img style={{height: "200px"}} src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide>
        <SwiperSlide style={{height: "200px", width: '400px'}}>
          <img style={{height: "200px"}} src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide>
        
      </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
