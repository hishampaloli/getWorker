import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { log } from "util";
import { postJobs } from "../../../actions/jobsActions";
import "./PostJobs.css";

const PostJobs = () => {

    const dispatch = useDispatch()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [level, setLevel] = useState("easy");
  const [tagsArray, setTagsArray] = useState([]);
  const [deadline, setDeadline] = useState('');
  const [tags, setTags] = useState('');

  const handlePost = (e) => {
    e.preventDefault();

    if (description !== '') {
    dispatch(postJobs(title, description, budget, deadline, level, tagsArray))    

    }
  }

  return (
    <div className="postJobs">
      <div className="post-box">
        <div className="top">
          <h4>Get started with your job post</h4>
        </div>

        <div className="bottom">
        <form onSubmit={handlePost} >
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
                setTagsArray((current => [...current, tags]));
                setTags('')
              }}
            >
              Add
            </button>
          </div>

          <div className="row1">
          {tagsArray.map(el => <p>{el}</p> )}
           
          </div>

          <div className="row">
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
                console.log(e.target.value)
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
          <button type="submit">Post Jobs</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJobs;
