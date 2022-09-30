
import {
  EMPLOYEE_PROFILE_FAIL,
  EMPLOYEE_PROFILE_REQUEST,
  EMPLOYEE_PROFILE_SUCCESS,
  BANK_DETAILS_FAIL,
  BANK_DETAILS_REQUEST,
  BANK_DETAILS_SUCCESS,
  EDUCATION_FAIL,
  EDUCATION_REQUEST,
  EDUCATION_SUCCESS,
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

export const educationReducer = (state = {}, action) => {
  switch (action.type) {
    case EDUCATION_REQUEST:
      return { loading: true };

    case EDUCATION_SUCCESS:
      return { loading: false };

    case EDUCATION_FAIL:
      return { loading: false };
    default:
      return state;
  }
};

export const bankDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case BANK_DETAILS_REQUEST:
      return { loading: true };

    case BANK_DETAILS_SUCCESS:
      return { loading: false, message: action.payload };

    case BANK_DETAILS_FAIL:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};
