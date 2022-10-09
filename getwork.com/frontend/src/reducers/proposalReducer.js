import {
  POST_PROPOSAL_REQUEST,
  POST_PROPOSAL_FAIL,
  POST_PROPOSAL_SUCCUSS,
  MY_PROPOSAL_REQUEST,
  MY_PROPOSAL_SUCCUSS,
  MY_PROPOSAL_FAIL,
} from "../contants/proposalConstants";

export const postProposalReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_PROPOSAL_REQUEST:
      return { loading: true, message: false };

    case POST_PROPOSAL_SUCCUSS:
      return { loading: false, message: true };

    case POST_PROPOSAL_FAIL:
      return { loading: false, error: action.error };

    default:
      return state;
  }
};

export const MyProposalReducer = (state = {}, action) => {
  switch (action.type) {
    case MY_PROPOSAL_REQUEST:
      return { loading: true };

    case MY_PROPOSAL_SUCCUSS:
      return { loading: false, data: action.payload };

    case MY_PROPOSAL_FAIL:
      return { loading: false, error: action.error };

    default:
      return state;
  }
};
