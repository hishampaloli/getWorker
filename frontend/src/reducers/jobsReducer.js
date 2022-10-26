import {
    ALL_JOBS_FAIL,
    ALL_JOBS_REQUEST,
    ALL_JOBS_SUCCES,
    JOBS_DETAILS_FAIL,
    JOBS_DETAILS_REQUEST,
  JOBS_DETAILS_SUCCES,
  JOBS_POST_FAIL,
  JOBS_POST_REQUEST,
  JOBS_POST_SUCCES,
  MYJOBS_FAIL,
  MYJOBS_REQUEST,
  MYJOBS_SUCCES,
  SAVE_JOBS_FAIL,
  SAVE_JOBS_REQUEST,
  SAVE_JOBS_SUCCES,
} from "../contants/jobsContants";

export const MyJobsReducer = (state = {}, action) => {
  switch (action.type) {
    case MYJOBS_REQUEST:
      return { loading: true };

    case MYJOBS_SUCCES:
      return { loading: false, myJobs: action.payload };

    case MYJOBS_FAIL:
      return { loading: false, error: action.error };

    default:
      return state;
  }
};


export const jobsDetailsReducer = (state = {}, action) => {
    switch (action.type) {
      case JOBS_DETAILS_REQUEST:
        return { loading: true };
  
      case JOBS_DETAILS_SUCCES:
        return { loading: false, jobDetails: action.payload };
  
      case JOBS_DETAILS_FAIL:
        return { loading: false, error: action.error };
  
      default:
        return state;
    }
  };


  
export const jobsPostReducer = (state = {}, action) => {
    switch (action.type) {
      case JOBS_POST_REQUEST:
        return { loading: true };
  
      case JOBS_POST_SUCCES:
        return { loading: false, message: action.payload };
  
      case JOBS_POST_FAIL:
        return { loading: false, error: action.error };
  
      default:
        return state;
    }
  };

  
  
export const allJobsReducer = (state = {}, action) => {
    switch (action.type) {
      case ALL_JOBS_REQUEST:
        return { loading: true };
  
      case ALL_JOBS_SUCCES:
        return { loading: false, jobs: action.payload.allJobs, page: action.payload.page, pages: action.payload.pages, };
  
      case ALL_JOBS_FAIL:
        return { loading: false, error: action.error };
  
      default:
        return state;
    }
  };

  export const saveJobsReducer = (state = {}, action) => {
    switch (action.type) {
      case SAVE_JOBS_REQUEST:
        return { loading: true};
  
      case SAVE_JOBS_SUCCES:
        return { loading: false };
  
      case SAVE_JOBS_FAIL:
        return { loading: false, error: action.error };
  
      default:
        return state;
    }
  };
