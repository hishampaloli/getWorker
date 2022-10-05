import {
  ADMIN_PROFILE_FAIL,
  ADMIN_PROFILE_REQUEST,
  ADMIN_PROFILE_SUCCESS,
  ALL_EMPLYEES_FAIL,
  ALL_EMPLYEES_REQUEST,
  ALL_EMPLYEES_SUCCESS,
  ALL_EMPLYERS_FAIL,
  ALL_EMPLYERS_REQUEST,
  ALL_EMPLYERS_SUCCESS,
  ALL_KYC_FAIL,
  ALL_KYC_REQUEST,
  ALL_KYC_SUCCESS,
  BLOCKED_USERS_FAIL,
  BLOCKED_USERS_REQUEST,
  BLOCKED_USERS_SUCCESS,
  KYC_STATUS_FAIL,
  KYC_STATUS_REQUEST,
  KYC_STATUS_SUCCESS,
} from "../contants/adminConstants";

export const adminProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_PROFILE_REQUEST:
      return { loading: true };

    case ADMIN_PROFILE_SUCCESS:
      return { loading: false, data: action.payload };

    case ADMIN_PROFILE_FAIL:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

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


export const AllKycReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_KYC_REQUEST:
      return { loading: true };

    case ALL_KYC_SUCCESS:
      return { loading: false, data: action.payload };

    case ALL_KYC_FAIL:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

export const kycStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case KYC_STATUS_REQUEST:
      return { loading: true };

    case KYC_STATUS_SUCCESS:
      return { loading: false};

    case KYC_STATUS_FAIL:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

