import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { findTalents } from "../../../actions/EmployerActions";
import { Link } from "react-router-dom";
import "./FindTalent.css";

const FindTalentsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const talents = useSelector((state) => state.findTalents);

  const [keyword, setKeyword] = useState("");
  const [earnings, setEarnings] = useState("");
  const [language, setLanguage] = useState("");
  const [jobsDone, setJobsDone] = useState("");

//   console.log(talents?.data[0]?.owner._id);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(findTalents(keyword, earnings, language, jobsDone));
  };

  useEffect(() => {
    if (user?.userInfo?.userType === "employee") {
      navigate("/users/home");
    }
    console.log(786);
  }, [user]);

  return (
    <div className="findTalents">
      <div className="left">
        <div className="main-cate-div">
          <p>Total Earned</p>
          <div className="cate-div">
            <label htmlFor=""> {"< 100"} </label>
            <input type="radio" name='sd' onChange={(e) => setEarnings(100)} id="" />
          </div>
          <div className="cate-div">
            <label htmlFor="">{"< 200"} </label>
            <input type="radio" name='sd' onChange={(e) => setEarnings(200)} id="" />
          </div>
          <div className="cate-div">
            <label htmlFor="">{"< 400"} </label>
            <input type="radio"  name='sd' onChange={(e) => setEarnings(300)}  id="" />
          </div>
          <div className="cate-div">
            <label htmlFor="">{"< 800"} </label>
            <input type="checkbox"  name='sd'  onChange={(e) => setEarnings(400)}  id="" />
          </div>
          <div className="cate-div">
            <label htmlFor="">{"1000 +"} </label>
            <input type="checkbox" name="" id="" />
          </div>
        </div>

        <div className="main-cate-div">
          <p>Jobs Done</p>
          <div className="cate-div">
            <label htmlFor="">0-10</label>
            <input type="checkbox" name="" id="" />
          </div>

          <div className="cate-div">
            <label htmlFor="">10-30</label>
            <input type="checkbox" name="" id="" />
          </div>

          <div className="cate-div">
            <label htmlFor="">30-100</label>
            <input type="checkbox" name="" id="" />
          </div>

          <div className="cate-div">
            <label htmlFor="">100+</label>
            <input type="checkbox" name="" id="" />
          </div>
        </div>

        <div className="main-cate-div">
          <p>Language</p>
          <div className="cate-div">
            <label htmlFor="">English</label>
            <input type="radio" name='lang' onChange={(e) => setLanguage('english')} id="" />
          </div>

          <div className="cate-div">
            <label htmlFor="">Hindi</label>
            <input type="radio" name='lang' onChange={(e) => setLanguage('hindi')}  id="" />
          </div>

          <div className="cate-div">
            <label htmlFor="">Malayalam</label>
            <input type="radio"  name='lang' onChange={(e) => setLanguage('malayalam')}  id="" />
          </div>

          <div className="cate-div">
            <label htmlFor="">other</label>
            <input type="radio"  name='lang' onChange={(e) => setLanguage('')} id="" />
          </div>
        </div>
      </div>
      <div className="right">
        <div className="top">
          <button>Search</button>
          <button>Saved </button>
        </div>

        <div className="middle">
          <form onSubmit={handleSubmit}>
            <input type="text" onChange={(e) => setKeyword(e.target.value)} />
            <button type="submit">Search</button>
          </form>
        </div>

        <div className="bottom">
          {talents
            ? talents?.data?.map((talent) => {
                return (
                  <div key={talent?._id}  className="talent-result">
                    <div className="t-left">
                      <img
                        src={
                          talent?.image
                            ? talent?.image
                            : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                        }
                        alt=""
                      />
                      <div>
                        <p style={{color: '#3ccf4e'}}>{talent?.owner?.name}</p>
                        <h4>{talent?.userTitle.slice(0,20)}. . .</h4>
                        <p>
                          total earend: <strong>{talent?.totalEarned}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="t-right">
                      <button> <Link to={`/user/publicView/${talent?.owner._id}`} > View Profile</Link></button>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
};

export default FindTalentsPage;
