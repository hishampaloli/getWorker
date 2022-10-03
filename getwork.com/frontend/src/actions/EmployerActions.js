import {
  CHANGE_E_PASSWORD_FAIL,
  CHANGE_E_PASSWORD_REQUEST,
  CHANGE_E_PASSWORD_SUCCESS,
  EMPLOYER_PROFILE_FAIL,
  EMPLOYER_PROFILE_REQUEST,
  EMPLOYER_PROFILE_SUCCESS,
  FIND_TALENDS_FAIL,
  FIND_TALENDS_REQUEST,
  FIND_TALENDS_SUCCESS,
} from "../contants/employerContants";
import axios from "axios";

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

    const { data } = await axios.get(`/api/employer/profile/${id._id}`, config);

    console.log(data);

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

      const { data } = await axios.patch(
        `/api/employer/profile/${id._id}`,
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
      console.log(error);
    }
  };

export const findTalents = (keyword = '', earnings = '', language = '', jobsDone= '') => async (dispatch, getState) => {
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

    const { data } = await axios.get(
      `http://localhost:3001/api/employer/allEmployees?keyword=${keyword}&earnings=${earnings}&language=${language}&jobsDone=${jobsDone}`,
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
    console.log(error);
  }
};
