import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../actions/UserAction';


const EmployeeHome = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  console.log(user);

  
  // dispatch(logout());
  useEffect(() => {
    if (!user?.userInfo) {
      navigate('/login')
    }
    if (user?.userInfo?.userType === 'employer' ) {
      navigate('/employer/home')
    }
    if (user?.userInfo?.userType === "admin") {
      navigate("/admin/profile");
    }
  }, [user, dispatch])

  return (
    <div>
      <h1>Employee</h1>
    </div>
  )
}

export default EmployeeHome
