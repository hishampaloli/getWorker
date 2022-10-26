import axios from "axios";
import {
  OTP_HELPER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  OTP_HELPER_SUCCESS,
  OTP_HELPER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
} from "../contants/userConstants";
import { axiosUserInstance } from "../contants/axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUserInstance.post(
      "/login",
      { email, password },
      config
    );
    


    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
    // localStorage.removeItem("userInfo");
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userRegister =
  (name, email, password, userType) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axiosUserInstance.post(
        "/register",
        { name, email, password, userType },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const verifyEmail = (userId, otp, userType) => async (dispatch) => {
  try {
    dispatch({
      type: OTP_HELPER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUserInstance.post(
      "/verify-email",
      { userId, otp, userType },
      config
    );

    

    dispatch({
      type: OTP_HELPER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    
    dispatch({
      type: OTP_HELPER_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  
  try {
    dispatch({
      type: USER_LOGOUT,
    });

    localStorage.removeItem("userInfo");
  } catch (error) {
    
  }
};

export const changePassword = (oldPass, newPass) => async (dispatch) => {
  try {
    dispatch({
      type: CHANGE_PASSWORD_REQUEST,
    });
    const tokenId = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenId.token}`,
      },
    };

    const { data } = await axiosUserInstance.patch(
      `/resetPassword/${tokenId._id}`,
      { oldPass, newPass },
      config
    );

    if (data === "Incorrect Old Password!") {
      dispatch({
        type: CHANGE_PASSWORD_SUCCESS,
        message: "Incorrect Old Password!",
      });
      
    } else {
      dispatch({
        type: CHANGE_PASSWORD_SUCCESS,
        message: "Successfully updated the password",
      });
    }

    
  } catch (error) {
    
    dispatch({
      type: CHANGE_PASSWORD_FAIL,
    });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUserInstance.patch(
      `/forgotPassword`,
      { email },
      config
    );

    

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      message: data,
    });
    
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      error: error,
    });
  }
};

export const forgotPasswordVerify =
  (email, otp, password) => async (dispatch) => {
    
    try {
      dispatch({
        type: RESET_PASSWORD_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axiosUserInstance.patch(
        `/forgotPasswordVerify`,
        { email, otp, password },
        config
      );

      

      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        message: data,
      });
    } catch (error) {
      
      dispatch({
        type: RESET_PASSWORD_FAIL,
        error: error,
      });
    }
  };
