import {
  CHANGE_E_PASSWORD_FAIL,
  CHANGE_E_PASSWORD_REQUEST,
  CHANGE_E_PASSWORD_SUCCESS,
  DELETE_MESSAGE_FAIL,
  DELETE_MESSAGE_REQUEST,
  DELETE_MESSAGE_SUCCESS,
  EMPLOYER_PROFILE_FAIL,
  EMPLOYER_PROFILE_REQUEST,
  EMPLOYER_PROFILE_SUCCESS,
  FIND_TALENDS_FAIL,
  FIND_TALENDS_REQUEST,
  FIND_TALENDS_SUCCESS,
} from "../contants/employerContants";
import { axiosEmployerInstance } from "../contants/axios";

export const getEmployerProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: EMPLOYER_PROFILE_REQUEST,
    });

    const id = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${id.token}`,
      },
    };

    const { data } = await axiosEmployerInstance.get(
      `/profile/${id._id}`,
      config
    );


    dispatch({
      type: EMPLOYER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYER_PROFILE_FAIL,
      error: error,
    });
  }
};

export const getEmployerProfileData = (id) => async (dispatch) => {
  try {
    dispatch({
      type: EMPLOYER_PROFILE_REQUEST,
    });

    const tokenId = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenId.token}`,
      },
    };

    const { data } = await axiosEmployerInstance.get(
      `/profile/${tokenId._id}/${id}`,
      config
    );


    dispatch({
      type: EMPLOYER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYER_PROFILE_FAIL,
      error: error,
    });
  }
};

export const editEmployerProfile =
  (name, oldPass, newPass, image) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CHANGE_E_PASSWORD_REQUEST,
      });

      const id = JSON.parse(localStorage.getItem("userInfo"));

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${id.token}`,
        },
      };

      const { data } = await axiosEmployerInstance.patch(
        `/profile/${id._id}`,
        { name, oldPass, newPass, image },
        config
      );

      if (name) {
        getState().employerData.userInfo.owner.name = name;
      }

      if (image) {
        getState().employerData.userInfo.image = image;
      }

      if (data?.message == "incorrect old passowrd") {
        dispatch({
          type: CHANGE_E_PASSWORD_FAIL,
          error: "Incorrect Password",
        });
      } else {
        dispatch({
          type: CHANGE_E_PASSWORD_SUCCESS,
        });
      }
    } catch (error) {
    }
  };

export const findTalents =
  (keyword = "", earnings = "", language = "", jobsDone = "", pageNumber='') =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: FIND_TALENDS_REQUEST,
      });

      const id = JSON.parse(localStorage.getItem("userInfo"));

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${id.token}`,
        },
      };

      const { data } = await axiosEmployerInstance.get(
        `/allEmployees?keyword=${keyword}&earnings=${earnings}&language=${language}&jobsDone=${jobsDone}&pageNumber=${pageNumber}`,
        config
      );

      dispatch({
        type: FIND_TALENDS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FIND_TALENDS_FAIL,
      });
    }
  };

export const saveTalents = (id) => async (dispatch, getState) => {
  try {
    const token_id = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token_id.token}`,
      },
    };

    const { data } = await axiosEmployerInstance.put(
      `/saveTalents/${token_id._id}`,
      {
        id,
      },
      config
    );

    if (data) {
      dispatch({
        type: EMPLOYER_PROFILE_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
  }
};

export const removeSavedTalent = (id) => async (dispatch, getState) => {
  try {
    const token_id = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token_id.token}`,
      },
    };

    const { data } = await axiosEmployerInstance.patch(
      `/saveTalents/${token_id._id}`,
      {
        id,
      },
      config
    );


    if (data) {
      dispatch({
        type: EMPLOYER_PROFILE_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
  }
};



export const deleteMessageEmployer = (id) => async (dispatch, getState) => {
  try {

    dispatch({
      type: DELETE_MESSAGE_REQUEST
    })

    const token_id = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token_id.token}`,
      },
    };


    const { data } = await axiosEmployerInstance.delete(
      `/deleteMessage/${token_id._id}/${id}`,
      config
    );


    if (data) {
      const noti = getState().employerData.userInfo.notification.filter((el) => {
        return el._id + "*" !== id + "*";
      });

      getState().employerData.userInfo.notification = noti

    }

    dispatch({
      type: DELETE_MESSAGE_SUCCESS
    })

  } catch (error) {
    dispatch({
      type: DELETE_MESSAGE_FAIL
    })
  }
};
