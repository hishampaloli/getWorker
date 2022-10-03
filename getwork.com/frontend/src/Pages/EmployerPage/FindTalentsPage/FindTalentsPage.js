import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./FindTalent.css";

const FindTalentsPage = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

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
            <label htmlFor="">0-100</label>
            <input type="checkbox" name="" id="" />
          </div>
          <div className="cate-div">
            <label htmlFor="">100-300</label>
            <input type="checkbox" name="" id="" />
          </div>
          <div className="cate-div">
            <label htmlFor="">300-500</label>
            <input type="checkbox" name="" id="" />
          </div>
          <div className="cate-div">
            <label htmlFor="">500-1000</label>
            <input type="checkbox" name="" id="" />
          </div>
          <div className="cate-div">
            <label htmlFor="">1000+</label>
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
            <input type="checkbox" name="" id="" />
          </div>
          
          <div className="cate-div">
            <label htmlFor="">Hindi</label>
            <input type="checkbox" name="" id="" />
          </div>

          <div className="cate-div">
            <label htmlFor="">Malayalam</label>
            <input type="checkbox" name="" id="" />
          </div>

          <div className="cate-div">
            <label htmlFor="">other</label>
            <input type="checkbox" name="" id="" />
          </div>
        </div>

        <div className="main-cate-div">
          <p>Skills</p>
          <div className="cate-div">
            <label htmlFor="">Web Development</label>
            <input type="checkbox" name="" id="" />
          </div>
          
          <div className="cate-div">
            <label htmlFor="">Web design</label>
            <input type="checkbox" name="" id="" />
          </div>

          <div className="cate-div">
            <label htmlFor="">Marketing</label>
            <input type="checkbox" name="" id="" />
          </div>

          <div className="cate-div">
            <label htmlFor="">Sales</label>
            <input className="" type="checkbox" name="" id="" />
          </div>
        </div>
      </div>
      <div className="right">
        <div className="top">
        <button>Search</button>
        <button>Saved </button>
        </div>

        <div className="middle">
        <form>
            <input type="text" />
            <button>Search</button>
        </form>
        </div>


        <div className="bottom">

        <div className="talent-result">
        <div className="t-left">
        <img src="" alt="" srcset="" />
        <div>
            <p>hihsma</p>
            <h4>my title</h4>
            <p>total earend</p>
        </div>
        </div>

        <div className="t-right">
        <button>Message</button>
        </div>
        </div>

        </div>
      </div>
    </div>
  );
};

export default FindTalentsPage;
