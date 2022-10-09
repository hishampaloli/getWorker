import { axiosProposalInstance } from "../contants/axios";

import {
  POST_PROPOSAL_FAIL,
  POST_PROPOSAL_REQUEST,
  POST_PROPOSAL_SUCCUSS,
} from "../contants/proposalConstants";



export const postProposal =
  (id, credit, cover, bid, deadline ) =>
  async (dispatch) => {

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
        {credit, cover, bid, deadline},
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