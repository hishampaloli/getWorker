import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeProfile } from "../../../actions/EmplyeeActions";
import EmpJobsComponents from "../JobsComponent/EmpJobsComponents";
import Alert from '@mui/material/Alert';


const SavedJobs = () => {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.employeeData);
  const job = userProfile?.userData?.savedJobs;
  const saveStatus = useSelector(state => state.saveStatus) 

  useEffect(() => {
    dispatch(getEmployeeProfile());
  }, []);
  console.log(userProfile);
  return (
    <div>
  
    {saveStatus?.loading ?   <div><Alert severity="info">Remove from saved jobs!</Alert></div> : ''  }

      <EmpJobsComponents jobs={job} sv={true} />
    </div>
  );
};

export default SavedJobs;
