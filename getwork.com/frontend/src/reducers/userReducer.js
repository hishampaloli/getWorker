import {
  OTP_HELPER_FAIL,
  OTP_HELPER_SUCCESS,
  OTP_HELPER_REQUEST,
  EMPLOYEE_REGISTER_REQUEST,
  EMPLOYEE_REGISTER_FAIL,
  EMPLOYEE_REGISTER_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT
} from "../contants/employeeConstands.js";

// export const userRegister = ()


export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = { users: {} }, action) => {
  console.log(action);
  switch (action.type) {
    case EMPLOYEE_REGISTER_REQUEST:
      return { loading: true };
    case EMPLOYEE_REGISTER_SUCCESS:
      return { loading: false, users: action.payload };
    case EMPLOYEE_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const otpHelper = (state = {}, action) => {
  switch (action.type) {
    case OTP_HELPER_REQUEST:
      return { loading: true };
    case OTP_HELPER_SUCCESS:
      return { loading: false, status: action.payload };
      case OTP_HELPER_FAIL:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};