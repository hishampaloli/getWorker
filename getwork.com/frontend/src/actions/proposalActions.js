import { axiosProposalInstance } from "../contants/axios";

import {
  MY_PROPOSAL_FAIL,
  MY_PROPOSAL_REQUEST,
  MY_PROPOSAL_SUCCUSS,
  POST_PROPOSAL_FAIL,
  POST_PROPOSAL_REQUEST,
  POST_PROPOSAL_SUCCUSS,
} from "../contants/proposalConstants";

export const postProposal =
  (id, credit, cover, bid, deadline) => async (dispatch) => {
    console.log(id);
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

      console.log(data);

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

export const myProposals = () => async (dispatch) => {
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
      `/myProposals/${tokenId._id}`,
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
