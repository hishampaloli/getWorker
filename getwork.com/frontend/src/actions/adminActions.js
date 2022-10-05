import axios from "axios";
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

export const adminProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_PROFILE_REQUEST,
    });

    const id = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${id.token}`,
      },
    };

    const { data } = await axios.get(`/api/admin/profile`, config);

    console.log(data);

    dispatch({
      type: ADMIN_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PROFILE_FAIL,
      error: error,
    });
  }
};

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
    } else if (type === "other") {
      const { data } = await axios.get(
        `http://localhost:3001/api/admin//blockedUsers`,
        config
      );

      dispatch({
        type: BLOCKED_USERS_SUCCESS,
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

export const allblockedUsers =
  (_id, key, type) => async (dispatch, getState) => {
    try {
      dispatch({
        type: BLOCKED_USERS_REQUEST,
      });

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

export const blacklistUsers = (_id) => async (dispatch, getState) => {
  try {
    const tokenId = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenId.token}`,
      },
    };

    const { data } = await axios.put(
      `http://localhost:3001/api/admin/blacklist`,
      { _id },
      config
    );

    dispatch({
      type: ADMIN_PROFILE_SUCCESS,
      payload: data,
    });

    console.log(data);
  } catch (error) {
    dispatch({
      type: BLOCKED_USERS_FAIL,
      error: error,
    });
  }
};

export const removeBlacklist = (id) => async (dispatch, getState) => {
  try {
    const tokenId = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenId.token}`,
      },
    };

    const { data } = await axios.put(
      `http://localhost:3001/api/admin/removeBlacklist`,
      { id },
      config
    );

    dispatch({
      type: ADMIN_PROFILE_SUCCESS,
      payload: data,
    });

    console.log(data);
  } catch (error) {
    dispatch({
      type: ADMIN_PROFILE_FAIL,
      error: error,
    });
  }
};

export const getAllKyc = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ALL_KYC_REQUEST,
    });

    const tokenId = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenId.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:3001/api/admin/allKyc`,
      config
    );

    dispatch({
      type: ALL_KYC_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_KYC_FAIL,
      error: error,
    });
  }
};

export const acceptOrRejectKyc = (id, status) => async (dispatch, getState) => {
  try {


    dispatch({
      type: KYC_STATUS_REQUEST
    })
    const tokenId = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenId.token}`,
      },
    };

    const { data } = await axios.post(
      `http://localhost:3001/api/admin/acceptKyc`,
      { id, status },
      config
    );

    dispatch({
      type: KYC_STATUS_SUCCESS
    })

    if (status === 'accept') {
      getState().allKyc.data.forEach(el => {
        if (el.owner._id === id) {
          el.kycStatus = 'accepted'
        }
        }) 
    }else {
      getState().allKyc.data.forEach(el => {
        if (el.owner._id === id) {
          el.kycStatus = 'rejected'
        }
        })
    }

  

    console.log(data);
    
  } catch (error) {
    dispatch({
      type: KYC_STATUS_FAIL,
      error: error,
    });
  }
};
