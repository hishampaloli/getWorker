import { axiosProposalInstance } from "../contants/axios";

import {
  ACCEPT_PROPOSAL_FAIL,
  ACCEPT_PROPOSAL_REQUEST,
  ACCEPT_PROPOSAL_SUCCUSS,
  MY_PROPOSAL_FAIL,
  MY_PROPOSAL_REQUEST,
  MY_PROPOSAL_SUCCUSS,
  POST_PROPOSAL_FAIL,
  POST_PROPOSAL_REQUEST,
  POST_PROPOSAL_SUCCUSS,
  VIEW_PROPOSAL_REQUEST,
  VIEW_PROPOSAL_SUCCUSS,
} from "../contants/proposalConstants";

export const postProposal =
  (id, credit, cover, bid, deadline) => async (dispatch) => {
    
    try {
      dispatch({
        type: POST_PROPOSAL_REQUEST,
      });

      const tokenId = JSON.parse(localStorage.getItem("userInfo"));

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenId.token}`,
        },
      };

      const { data } = await axiosProposalInstance.post(
        `/proposal/${tokenId._id}/${id}`,
        { credit, cover, bid, deadline },
        config
      );

      

      dispatch({
        type: POST_PROPOSAL_SUCCUSS,
      });
    } catch (error) {
      dispatch({
        type: POST_PROPOSAL_FAIL,
        error: error,
      });
    }
  };

export const myProposals = (pageNumber = '') => async (dispatch) => {
  try {
    dispatch({
      type: MY_PROPOSAL_REQUEST,
    });

    const tokenId = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenId.token}`,
      },
    };

    const { data } = await axiosProposalInstance.get(
      `/myProposals/${tokenId._id}?pageNumber=${pageNumber} `,
      config
    );

    dispatch({
      type: MY_PROPOSAL_SUCCUSS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MY_PROPOSAL_FAIL,
      error: error,
    });
  }
};

export const viewProposals = (id) => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_PROPOSAL_REQUEST,
    });

    const tokenId = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenId.token}`,
      },
    };

    const { data } = await axiosProposalInstance.get(
      `viewProposal/${id}`,
      config
    );

    dispatch({
      type: VIEW_PROPOSAL_SUCCUSS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VIEW_PROPOSAL_REQUEST,
      error: error,
    });
  }
};

export const proposalState = (id, status) => async (dispatch) => {
  try {
    // dispatch({
    //   type: VIEW_PROPOSAL_REQUEST,
    // });

    const tokenId = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenId.token}`,
      },
    };

    const { data } = await axiosProposalInstance.patch(
      `updateProposal/${tokenId?._id}/${id}`,
      { status },
      config
    );


    // dispatch({
    //   type: VIEW_PROPOSAL_SUCCUSS,
    //   payload: data,
    // });
  } catch (error) {
    dispatch({
      type: VIEW_PROPOSAL_REQUEST,
      error: error,
    });
  }
};

export const acceptProposal = (id, totalAmount) => async (dispatch) => {
  try {
    dispatch({
      type: ACCEPT_PROPOSAL_REQUEST,
    });

    const tokenId = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenId.token}`,
      },
    };

    
    const { data } = await axiosProposalInstance.post(
      `/acceptProposal/${tokenId._id}/${id}`,
      { totalAmount },
      config
    );



    dispatch({
      type: ACCEPT_PROPOSAL_SUCCUSS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ACCEPT_PROPOSAL_FAIL,
      error: error,
    });
  }
};
