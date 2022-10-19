import { axiosChatInstance } from "../contants/axios";
import {
  MY_CHATS_REQUEST,
  MY_CHATS_SUCCESS,
  MY_ROOMS_FAIL,
  MY_ROOMS_REQUEST,
  MY_ROOMS_SUCCESS,
} from "../contants/chatConstants";

export const getMyRooms =
  (user = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: MY_ROOMS_REQUEST,
      });

      const tokenId = JSON.parse(localStorage.getItem("userInfo"));

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenId.token}`,
        },
      };

      const { data } = await axiosChatInstance.get(
        `/myChats/${tokenId._id}`,
        config
      );

      console.log(data);

      dispatch({
        type: MY_ROOMS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: MY_ROOMS_FAIL,
        error: error,
      });
    }
  };

export const getMyChats = (roomId, user) => async (dispatch) => {
  console.log(user + ">>>>>>>>>>>>>>>>>>>>>>>>>>>..");
  try {
    dispatch({
      type: MY_CHATS_REQUEST,
    });

    const tokenId = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenId.token}`,
      },
    };

    const { data } = await axiosChatInstance.get(
      `/chats/${roomId}?user=${user}`,
      config
    );


    console.log(data);

    dispatch({
      type: MY_CHATS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MY_CHATS_SUCCESS,
      error: error,
    });
  }
};
