import React from 'react'
import { Link } from 'react-router-dom';
import './emplJobscom.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import { useDispatch } from 'react-redux';
import { removeSaveJobs, saveJobs } from '../../../actions/EmplyeeActions';

import Alert from '@mui/material/Alert';

const EmpJobsComponents = ({jobs, sv}) => {
  const dispatch = useDispatch();

console.log(jobs);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {jobs
        ? jobs?.map((job) => {
            return (
              <div className="emp-jobs-div">
                <div className="s">
                  <h4>{job?.title}</h4>
                  <p className='mt-2'>
                    Est.Budget: <strong>${job?.budget}</strong>
                  </p>

                  <p>{job?.description?.split(0,1)}...</p>

                  <div className="rowEm">
                    <p className="rpEm  mt-1">
                      Difficulty: <strong>{job?.level}</strong>
                    </p>

                    <p className="rpEm  mt-1">
                      Deadline: <strong>{job?.deadline} days</strong>
                    </p>
                  </div>

                  <p>Proposals: {job?.proposals?.length}</p>
                </div>

                <Link to={`/jobs/${job?._id}`}>
                  <button style={{ marginLeft: "auto" }} className="eyebtnnn">
                    <VisibilityIcon />
                  </button>
                </Link>

                {sv ?  <Link >
                  <button onClick={() => dispatch(removeSaveJobs(job?._id))} style={{ marginLeft: "auto" }} className="savedbtnnn">
                    <BookmarkRemoveIcon />
                  </button>
                </Link> : <Link >
                  <button onClick={() => dispatch(saveJobs(job?._id))} style={{ marginLeft: "auto" }} className="savedbtnnn">
                    <BookmarkBorderIcon />
                  </button>
                </Link> }

               
              </div>
            );
          })
        : ""}
    </div>
  )
}

export default EmpJobsComponents