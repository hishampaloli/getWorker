import {
  OTP_HELPER_FAIL,
  OTP_HELPER_SUCCESS,
  OTP_HELPER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
} from "../contants/userConstants.js";

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
 
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_REGISTER_SUCCESS:
      return { loading: false, users: action.payload };

    case USER_REGISTER_FAIL:
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

export const changePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST:
      return { loading: true };
      
    case CHANGE_PASSWORD_SUCCESS:
      return { loading: false, message: action.message };
      
    case CHANGE_PASSWORD_FAIL:
      return { loading: false, message: "" };
      
    default:
      return state;
  }
};


export const ForgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return { loading: true };
      
    case RESET_PASSWORD_SUCCESS:
      return { loading: false, message: action.message };
      
    case RESET_PASSWORD_FAIL:
      return { loading: false, error: action.error };
      
    default:
      return state;
  }
};

