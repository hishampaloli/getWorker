import {
  POST_PROPOSAL_REQUEST,
  POST_PROPOSAL_FAIL,
  POST_PROPOSAL_SUCCUSS,
  MY_PROPOSAL_REQUEST,
  MY_PROPOSAL_SUCCUSS,
  MY_PROPOSAL_FAIL,
  VIEW_PROPOSAL_REQUEST,
  VIEW_PROPOSAL_SUCCUSS,
  VIEW_PROPOSAL_FAIL,
  ACCEPT_PROPOSAL_REQUEST,
  ACCEPT_PROPOSAL_FAIL,
  ACCEPT_PROPOSAL_SUCCUSS,
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
      return { loading: false, data: action.payload.proposals, page: action.payload.page, pages: action.payload.pages };

    case MY_PROPOSAL_FAIL:
      return { loading: false, error: action.error };

    default:
      return state;
  }
};

export const viewProposalReducer = (state = {}, action) => {
  switch (action.type) {
    case VIEW_PROPOSAL_REQUEST:
      return { loading: true };

    case VIEW_PROPOSAL_SUCCUSS:
      return { loading: false, data: action.payload };

    case VIEW_PROPOSAL_FAIL:
      return { loading: false, error: action.error };

    default:
      return state;
  }
};



export const acceptProposalReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCEPT_PROPOSAL_REQUEST:
      return { loading: true };

    case ACCEPT_PROPOSAL_SUCCUSS:
      return { loading: false, data: action.payload };

    case ACCEPT_PROPOSAL_FAIL:
      return { loading: false, error: action.error };

    default:
      return state;
  }
};
