import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { blockUser, getAllEmplyers } from "../../../actions/adminActions";
import Alert from "@mui/material/Alert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Spinner from "react-bootstrap/Spinner";
import './jobss.scss'
import CustomSpinner from "../../customSpinner/CustomSpinner";
import MyjobsComponents from "../EmployerProfile-1/MyjobsComponents";

const ActiveJobs = ({jobs}) => {

    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState("");
    const [alert, setAlert] = useState(false);


    const Employers= ''
  return (
    <div className="jobPostPage">
    <div className="jobPost-box">
    <div className="middle">
      {alert ? (
        <Alert
          style={{ position: "fixed", top: "30px", right: "50px" }}
          severity="warning"
        >
          Loading !
        </Alert>
      ) : (
        ""
      )}
     
    </div>

    <div className="botto">
      {jobs ? (
        <MyjobsComponents jobs={jobs} />
      ) : (
        <div style={{display: 'flex', justifyContent: 'center'}} >
      
            <CustomSpinner />
          
        </div>
      )}

      {jobs?.length > 0 ? '': <div style={{width: '100%', display: 'flex', justifyContent: 'center'}} ><img  style={{ width: "260px", height: "260px" }} src="https://static.vecteezy.com/system/resources/previews/005/073/071/original/user-not-found-account-not-register-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg" alt="" /></div>  }
    </div>
    </div>
  </div>
  )
}

export default ActiveJobs
