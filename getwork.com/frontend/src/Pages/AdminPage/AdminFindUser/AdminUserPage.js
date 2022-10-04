import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './AdminUser.css'
import { getAllEmplyees } from '../../../actions/adminActions';
import AllEmployees from '../../../components/AdminUser/AllEmployees';
import AllEmployers from '../../../components/AdminUser/AllEmployers';
import BlockedUsers from '../../../components/AdminUser/BlockedUsers';

const AdminUserPage = () => {
    const dispatch = useDispatch();

    const [ed, setEd] = useState('employee');

    

  return (
    <div className='adminUserPage' >
    <div className="adminUserPage-box">
    <div className="top">
            <button onClick={() => setEd("employee")} >Employees</button>
            <button onClick={() => setEd("employer")}>Employers</button>
            <button onClick={() => setEd("block")}>Blocked Users</button>
            <button onClick={() => setEd("black")}>Blacklisted</button>
        </div>

        <div className="bottom">
        {ed === "employee" ? (
        <AllEmployees />
      ) : ed === "employer" ? (
        <AllEmployers />
      ) : ed === "block" ? (
        <BlockedUsers />
      ) : (
        ""
      )}
        </div>
    </div>
        
    </div>
  )
}

export default AdminUserPage