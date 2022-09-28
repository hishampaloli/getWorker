import {
  EMPLOYEE_PROFILE_FAIL,
  EMPLOYEE_PROFILE_REQUEST,
  EMPLOYEE_PROFILE_SUCCESS,
} from "../contants/employeeConstants.js";
import { USER_LOGOUT } from "../contants/userConstants.js";



export const employeeProfileReducer = (state = {}, action) => {
    switch (action.type) {
      case EMPLOYEE_PROFILE_REQUEST:
        return { loading: true };
      case EMPLOYEE_PROFILE_SUCCESS:
        return { loading: false, userData: action.payload };
      case EMPLOYEE_PROFILE_FAIL:
        return { loading: false, error: action.payload };
      case USER_LOGOUT:
        return {};
      default:
        return state;
    }
  };