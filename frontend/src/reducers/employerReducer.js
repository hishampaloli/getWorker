import {
  CHANGE_E_PASSWORD_FAIL,
  CHANGE_E_PASSWORD_REQUEST,
  CHANGE_E_PASSWORD_SUCCESS,
  DELETE_MESSAGE_FAIL,
  DELETE_MESSAGE_REQUEST,
  DELETE_MESSAGE_SUCCESS,
  EMPLOYER_PROFILE_FAIL,
  EMPLOYER_PROFILE_REQUEST,
  EMPLOYER_PROFILE_SUCCESS,
  FIND_TALENDS_FAIL,
  FIND_TALENDS_REQUEST,
  FIND_TALENDS_SUCCESS,
} from "../contants/employerContants.js";

export const EmpoyerProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYER_PROFILE_REQUEST:
      return { loading: true };

    case EMPLOYER_PROFILE_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case EMPLOYER_PROFILE_FAIL:
      return { loading: false, error: action.error };

    default:
      return state;
  }
};

export const EmpoyerPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_E_PASSWORD_REQUEST:
      return { loading: true, success: false };

    case CHANGE_E_PASSWORD_SUCCESS:
      return { loading: false, success: true };

    case CHANGE_E_PASSWORD_FAIL:
      return { loading: false, error: action.error, success: false };

    default:
      return state;
  }
};

export const FindTalentsReducer = (state = {}, action) => {
  switch (action.type) {
    case FIND_TALENDS_REQUEST:
      return { loading: true };

    case FIND_TALENDS_SUCCESS:
      return { loading: false, data: action.payload.allEmplyees, page: action.payload.page, pages: action.payload.pages };

    case FIND_TALENDS_FAIL:
      return { loading: false, error: action.error };

    default:
      return state;
  }
};

export const deleteMessageReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_MESSAGE_REQUEST:
      return { loading: true };

    case DELETE_MESSAGE_SUCCESS:
      return { loading: false };

    case DELETE_MESSAGE_FAIL:
      return { loading: false, error: action.error };

    default:
      return state;
  }
};
