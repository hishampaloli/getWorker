import axios from "axios";
import {
  ADMIN_CHATS_FAIL,
  ADMIN_CHATS_REQUEST,
  ADMIN_CHATS_SUCCESS,
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
import { axiosAdminInstance } from "../contants/axios";
import {
  DO_WITHDRAW_REQUEST,
  WITHDRAW_FAIL,
  WITHDRAW_REQUEST,
  WITHDRAW_SUCCESS,
} from "../contants/employeeConstants.js";
import {
  PURCHASE_hISTORY_FAIL,
  PURCHASE_hISTORY_REQUEST,
  PURCHASE_hISTORY_SUCCUSS,
} from "../contants/paymentConstants";

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

    const { data } = await axiosAdminInstance.get(`/profile`, config);

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

      const { data } = await axiosAdminInstance.get(
        `/allEmployees?keyword=${keyword}`,
        config
      );

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

      const { data } = await axiosAdminInstance.get(
        `/allEmployers?keyword=${keyword}`,
        config
      );

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

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenId.token}`,
      },
    };

    const { datad } = await axiosAdminInstance.patch(`/block/${_id}`, config);

    if (type === "employee") {
      const { data } = await axiosAdminInstance.get(
        `/allEmployees?keyword=${key}`,
        config
      );

      dispatch({
        type: ALL_EMPLYEES_SUCCESS,
        payload: data,
      });
    } else if (type === "other") {
      const { data } = await axiosAdminInstance.get(`/blockedUsers`, config);

      dispatch({
        type: BLOCKED_USERS_SUCCESS,
        payload: data,
      });
    } else {
      const { data } = await axiosAdminInstance.get(
        `/allEmployers?keyword=${key}`,
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

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenId.token}`,
        },
      };

      const { data } = await axiosAdminInstance.get(`/blockedUsers`, config);

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

    const { data } = await axiosAdminInstance.put(
      `/blacklist`,
      { _id },
      config
    );

    dispatch({
      type: ADMIN_PROFILE_SUCCESS,
      payload: data,
    });
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

    const { data } = await axiosAdminInstance.put(
      `/removeBlacklist`,
      { id },
      config
    );

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

    const { data } = await axiosAdminInstance.get(`/allKyc`, config);

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

export const acceptOrRejectKyc =
  (id, status, msg) => async (dispatch, getState) => {
    try {
      dispatch({
        type: KYC_STATUS_REQUEST,
      });
      const tokenId = JSON.parse(localStorage.getItem("userInfo"));

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenId.token}`,
        },
      };

      const { data } = await axiosAdminInstance.post(
        `/acceptKyc`,
        { id, status, msg },
        config
      );

      dispatch({
        type: KYC_STATUS_SUCCESS,
      });

      if (status === "accept") {
        getState().allKyc.data.forEach((el) => {
          if (el.owner._id === id) {
            el.kycStatus = "accepted";
          }
        });
      } else {
        getState().allKyc.data.forEach((el) => {
          if (el.owner._id === id) {
            el.kycStatus = "rejected";
          }
        });
      }
    } catch (error) {
      dispatch({
        type: KYC_STATUS_FAIL,
        error: error,
      });
    }
  };

export const getAllWithdraw = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: WITHDRAW_REQUEST,
    });
    const tokenId = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenId.token}`,
      },
    };

    const { data } = await axiosAdminInstance.get("/getAllWithdraw", config);

    dispatch({
      type: WITHDRAW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WITHDRAW_FAIL,
      error: error,
    });
  }
};

export const doWithdraw = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DO_WITHDRAW_REQUEST,
    });

    const tokenId = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenId.token}`,
      },
    };

    const { data } = await axiosAdminInstance.post(
      `doWithdraw/${tokenId._id}/${id}`,
      config
    );
    if (data) {
      getState().withdrawHistory.data.map((el) => {
        if (el._id === id) {
          el.status = "finished";
        }
      });
    }

    dispatch({
      type: DO_WITHDRAW_REQUEST,
      // payload: data,
    });
  } catch (error) {
    dispatch({
      type: DO_WITHDRAW_REQUEST,
      error: error,
    });
  }
};

export const ParchaseHistory = () => async (dispatch) => {
  try {
    dispatch({
      type: PURCHASE_hISTORY_REQUEST,
    });

    const tokenId = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenId.token}`,
      },
    };

    const { data } = await axiosAdminInstance.get(`/allPurchase`, config);

    dispatch({
      type: PURCHASE_hISTORY_SUCCUSS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PURCHASE_hISTORY_FAIL,
      error: error,
    });
  }
};

export const myUserChats = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_CHATS_REQUEST,
    });

    const tokenId = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenId.token}`,
      },
    };

    const { data } = await axiosAdminInstance.get(`/mychatsHelp`, config);
    
    dispatch({
      type: ADMIN_CHATS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_CHATS_FAIL,
      error: error,
    });
  }
};
