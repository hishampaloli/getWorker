import {
  ALL_EMPLYEES_FAIL,
  ALL_EMPLYEES_REQUEST,
  ALL_EMPLYEES_SUCCESS,
  ALL_EMPLYERS_FAIL,
  ALL_EMPLYERS_REQUEST,
  ALL_EMPLYERS_SUCCESS,
  BLOCKED_USERS_FAIL,
  BLOCKED_USERS_REQUEST,
  BLOCKED_USERS_SUCCESS,
} from "../contants/adminConstants";

export const AllEmployeesREducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_EMPLYEES_REQUEST:
      return { loading: true };

    case ALL_EMPLYEES_SUCCESS:
      return { loading: false, data: action.payload };

    case ALL_EMPLYEES_FAIL:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

export const AllEmployersREducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_EMPLYERS_REQUEST:
      return { loading: true };

    case ALL_EMPLYERS_SUCCESS:
      return { loading: false, data: action.payload };

    case ALL_EMPLYERS_FAIL:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};


export const blockedUserReducer = (state = {}, action) => {
    switch (action.type) {
      case BLOCKED_USERS_REQUEST:
        return { loading: true };
  
      case BLOCKED_USERS_SUCCESS:
        return { loading: false, data: action.payload };
  
      case BLOCKED_USERS_FAIL:
        return { loading: false, error: action.error };
      default:
        return state;
    }
  };
  