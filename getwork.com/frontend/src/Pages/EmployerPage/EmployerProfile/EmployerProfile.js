import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getEmployerProfile } from "../../../actions/EmployerActions";
import { logout } from "../../../actions/UserAction";
import EmployerProfile1 from "../../../components/EmployerComponents/EmployerProfile-1/EmployerProfile1";
import "./EmployerProfile.css";

const EmployerProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user?.userInfo) {
      navigate("/login");
    }
    if (user?.userInfo?.userType === "employee") {
      navigate("/employee/home");
    }

    dispatch(getEmployerProfile());
  }, [user]);

  // dispatch(logout())

  return (
    <div className="employerProfile">
      <div className="left">
        <div className="left-top">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi37a9hVS3QQVHQu7f8f6k44zi5RbGMsUPtCqEjGxvWQ&s"
            alt=""
          />
          <p>Employer</p>
        </div>

        <div className="left-bottom">
          <button>My profile</button>
          <button>My profile</button>
          <button>My profile</button>
        </div>
      </div>

      <div className="right">
        <EmployerProfile1 />
      </div>
    </div>
  );
};

export default EmployerProfile;
