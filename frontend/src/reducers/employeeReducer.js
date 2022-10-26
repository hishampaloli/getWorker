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
  SKILL_N_LANGUAGE_REQUEST,
  SKILL_N_LANGUAGE_SUCCESS,
  SKILL_N_LANGUAGE_FAIL,
  INFO_REQUEST,
  INFO_SUCCESS,
  INFO_FAIL,
  PORTFOLIO_SUCCESS,
  PORTFOLIO_REQUEST,
  PORTFOLIO_FAIL,
  PROFILE_PIC_REQUEST,
  PROFILE_PIC_SUCCESS,
  PROFILE_PIC_FAIL,
  EMPLOYEE_PROFILE_PUBLIC_REQUEST,
  EMPLOYEE_PROFILE_PUBLIC_SUCCESS,
  EMPLOYEE_PROFILE_PUBLIC_FAIL,
  WITHDRAW_REQUEST,
  WITHDRAW_SUCCESS,
  WITHDRAW_FAIL,
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

export const employeeProfilePublicViewReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_PROFILE_PUBLIC_REQUEST:
      return { loading: true };

    case EMPLOYEE_PROFILE_PUBLIC_SUCCESS:
      return { loading: false, userData: action.payload };

    case EMPLOYEE_PROFILE_PUBLIC_FAIL:
      return { loading: false, error: action.error };
      
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

export const languageAndSkillReducer = (state = {}, action) => {
  switch (action.type) {
    case SKILL_N_LANGUAGE_REQUEST:
      return { loading: true };

    case SKILL_N_LANGUAGE_SUCCESS:
      return { loading: false, message: action.payload };

    case SKILL_N_LANGUAGE_FAIL:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

export const infoReducer = (state = {}, action) => {
  switch (action.type) {
    case INFO_REQUEST:
      return { loading: true };

    case INFO_SUCCESS:
      return { loading: false };

    case INFO_FAIL:
      return { loading: false };
    default:
      return state;
  }
};

export const portfolioReducer = (state = {}, action) => {
  switch (action.type) {
    case PORTFOLIO_REQUEST:
      return { loading: true, success: false };

    case PORTFOLIO_SUCCESS:
      return { loading: false, success: true };

    case PORTFOLIO_FAIL:
      return { loading: false, error: true, success: false };
    default:
      return state;
  }
};

export const bankDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case BANK_DETAILS_REQUEST:
      return { loading: true };

    case BANK_DETAILS_SUCCESS:
      return { loading: false, action: action.payload };

    case BANK_DETAILS_FAIL:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

export const PorfileImageReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_PIC_REQUEST:
      return { loading: true };

    case PROFILE_PIC_SUCCESS:
      return { loading: false, action: action.payload };

    case PROFILE_PIC_FAIL:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};




export const WithdrawHistroyReducer = (state = {}, action) => {
  switch (action.type) {
    case WITHDRAW_REQUEST:
      return { loading: true };

    case WITHDRAW_SUCCESS:
      return { loading: false, data: action.payload};

    case WITHDRAW_FAIL:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};



