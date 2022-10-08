import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployeeProfile } from '../../../actions/EmplyeeActions';

const SavedJobs = () => {
    const dispatch = useDispatch();

    
  const userProfile = useSelector((state) => state.employeeData);
   useEffect(() => {
        dispatch(getEmployeeProfile())
    })

  return (
    <div>
      fh
    </div>
  )
}

export default SavedJobs
