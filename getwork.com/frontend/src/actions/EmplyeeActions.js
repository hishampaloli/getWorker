import axios from "axios";
import {
  EMPLOYEE_PROFILE_FAIL,
  EMPLOYEE_PROFILE_REQUEST,
  EMPLOYEE_PROFILE_SUCCESS,
} from "../contants/employeeConstants.js";

export const getEmployeeProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: EMPLOYEE_PROFILE_REQUEST,
    });

    const id = JSON.parse(localStorage.getItem("userInfo"));

    const { data } = await axios.get(`/api/employee/profile/${id._id}`);

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
