import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postJobs } from "../../../actions/jobsActions";
import CustomSpinner from "../../../components/customSpinner/CustomSpinner";
import Alert from "@mui/material/Alert";
import "./PostJobs.scss";
import { useNavigate } from "react-router-dom";

const PostJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const jobPost = useSelector((state) => state.jobPost);


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [level, setLevel] = useState("easy");
  const [tagsArray, setTagsArray] = useState([]);
  const [deadline, setDeadline] = useState("");
  const [tags, setTags] = useState("");
  const [msg, setMgs] = useState(false);


  const handlePost = (e) => {
    e.preventDefault();

    if (description !== "") {
      dispatch(
        postJobs(title, description, budget, deadline, level, tagsArray)
      );
      setMgs(true)
    }

    if (jobPost?.message) {
      setTimeout(() => {
        navigate('/employer/myposts') 
        setMgs(false)
      }, 1000);
    
    }
  };

  return (
    <div className="postJobs">
      <div className="post-box">
        <div className="top">
          <h4>Get started with your job post</h4>
        </div>

        <div className="bottom">
          <form onSubmit={handlePost}>
            <input
              required
              type="text"
              placeholder="Title for your job post"
              name=""
              id=""
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              name=""
              placeholder="Add your detailed decription about your job"
              id=""
              required
              onChange={(e) => setDescription(e.target.value)}
              cols="30"
              rows="10"
            ></textarea>

            <div className="row">
              <input
                type="text"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
                placeholder="Add Search tags"
              />{" "}
              <button
                onClick={(e) => {
                  setTagsArray((current) => [...current, tags]);
                  setTags("");
                }}
              >
                Add
              </button>
            </div>

            <div className="row1">
              {tagsArray.map((el) => (
                <p>{el}</p>
              ))}
            </div>

            <div className="row-2">
              <input
                onChange={(e) => setBudget(e.target.value)}
                type="number"
                placeholder="$Budget"
                name=""
                required
                id=""
              />
              <input
                onChange={(e) => setDeadline(e.target.value)}
                type="number"
                required
                name=""
                placeholder="Number of days to finish"
                id=""
              />

              <select
                onChange={(e) => {
                  console.log(e.target.value);
                  setLevel(e.target.value);
                }}
                name="cars"
                id="cars"
              >
                <option value="easy">Easy</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="btn-div-">
            {user.userInfo?.isBlocked ? (
              <button className="blk-btn"
                style={{ backgroundColor: "#FF6C6C"}}
                disabled
              >
                Your accound is Blocked
              </button>
            ) : (
              <button type="submit">Post Jobs</button>
              
            )}
            </div>
            
            {jobPost?.loading ? <CustomSpinner /> : ""}
            {jobPost?.message && msg ? (
              <Alert style={{width: '90%'}} className='mb-3' severity="info">
                Job Posted
              </Alert>
            ) : (
              " "
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJobs;
