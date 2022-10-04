import axios from "axios";
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

export const getAllEmplyees =
  (keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_EMPLYEES_REQUEST,
      });

      const id = JSON.parse(localStorage.getItem("userInfo"));

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${id.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/admin/allEmployees?keyword=${keyword}`,
        config
      );

      console.log(data);

      dispatch({
        type: ALL_EMPLYEES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_EMPLYEES_FAIL,
        error: error,
      });
    }
  };

export const getAllEmplyers =
  (keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_EMPLYERS_REQUEST,
      });

      const id = JSON.parse(localStorage.getItem("userInfo"));

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${id.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/admin/allEmployers?keyword=${keyword}`,
        config
      );

      console.log(data);

      dispatch({
        type: ALL_EMPLYERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_EMPLYERS_FAIL,
        error: error,
      });
    }
  };

export const blockUser = (_id, key, type) => async (dispatch, getState) => {
  try {
    const tokenId = JSON.parse(localStorage.getItem("userInfo"));
    console.log(type);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenId.token}`,
      },
    };

    const { datad } = await axios.patch(
      `http://localhost:3001/api/admin/block/${_id}`,
      config
    );

    if (type === "employee") {
      const { data } = await axios.get(
        `/api/admin/allEmployees?keyword=${key}`,
        config
      );

      dispatch({
        type: ALL_EMPLYEES_SUCCESS,
        payload: data,
      });
    } else {
      const { data } = await axios.get(
        `/api/admin/allEmployers?keyword=${key}`,
        config
      );

      dispatch({
        type: ALL_EMPLYERS_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: ALL_EMPLYEES_FAIL,
      error: error,
    });
  }
};


export const allblockedUsers = (_id, key, type) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BLOCKED_USERS_REQUEST,
        })

      const tokenId = JSON.parse(localStorage.getItem("userInfo"));
      console.log(type);
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenId.token}`,
        },
      };
  
      const { data } = await axios.get(
        `http://localhost:3001/api/admin//blockedUsers`,
        config
      );
  
      console.log(data);
        // const { data } = await axios.get(
        //   `/api/admin/allEmployees?keyword=${key}`,
        //   config
        // );
  
        dispatch({
          type: BLOCKED_USERS_SUCCESS,
          payload: data,
        });
     
    } catch (error) {
      dispatch({
        type: BLOCKED_USERS_FAIL,
        error: error,
      });
    }
  };
  