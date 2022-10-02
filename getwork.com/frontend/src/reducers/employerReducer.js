import {
  EMPLOYER_PROFILE_FAIL,
  EMPLOYER_PROFILE_REQUEST,
  EMPLOYER_PROFILE_SUCCESS,
} from "../contants/employerContants.js";

export const userLoginReducer = (state = {}, action) => {
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
