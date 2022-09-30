import axios from "axios";
import {
  BANK_DETAILS_FAIL,
  BANK_DETAILS_REQUEST,
  BANK_DETAILS_SUCCESS,
  EDUCATION_REQUEST,
  EDUCATION_SUCCESS,
  EMPLOYEE_PROFILE_FAIL,
  EMPLOYEE_PROFILE_REQUEST,
  EMPLOYEE_PROFILE_SUCCESS,
} from "../contants/employeeConstants.js";

export const getEmployeeProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: EMPLOYEE_PROFILE_REQUEST,
    });

    const id = JSON.parse(localStorage.getItem("userInfo"));

    console.log(2323);

    const { data } = await axios.get(`/api/employee/profile/${id._id}`);

    dispatch({
      type: EMPLOYEE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_PROFILE_FAIL,
      error: error,
    });
  }
};

export const addEducation = (education) => async (dispatch, getState) => {
  dispatch({
    type: EDUCATION_REQUEST,
  });

  const id = JSON.parse(localStorage.getItem("userInfo"));

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${id.token}`,
    },
  };

  const { data } = await axios.post(
    `/api/employee/education/${id._id}`,
    { education },
    config
  );

  console.log(data);

  if (data) {
    getState().employeeData.userData.educations.push({
      owner: data?.owner,
      school: data?.school,
      title: data?.title,
      _id: data?._id,
    });
  }

  dispatch({
    type: EDUCATION_SUCCESS,
  });
};

export const deleteEducation = (id, userId) => async (dispatch) => {
  dispatch({
    type: EMPLOYEE_PROFILE_REQUEST,
  });

  const tokenId = JSON.parse(localStorage.getItem("userInfo"));

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenId.token}`,
    },
  };

  const { datad } = await axios.delete(
    `/api/employee/education/${userId}/${id}/`,
    config
  );

  const { data } = await axios.get(`/api/employee/profile/${tokenId._id}`);

  dispatch({
    type: EMPLOYEE_PROFILE_SUCCESS,
    payload: data,
  });

  console.log(data);
};

export const addLanguageOrSkill =
  (language, skill) => async (dispatch, getState) => {
    // dispatch({
    //   type: EMPLOYEE_PROFILE_REQUEST,
    // });

    const tokenId = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenId.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/employee/editProfile/${tokenId._id}`,
      { language, skill },
      config
    );

    if (data) {
      if (skill) {
        getState().employeeData.userData.skills.push({ skill: skill });
      }

      if (language) {
        getState().employeeData.userData.languages.push({ language: language });
      }
    }

    console.log(getState().employeeData.userData.skills);
  };

export const deleteLanguageOrSkill =
  (language = "", skill = "") =>
  async (dispatch, getState) => {
    dispatch({
      type: EMPLOYEE_PROFILE_REQUEST,
    });

    const tokenId = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenId.token}`,
      },
    };

    const { datad } = await axios.delete(
      `/api/employee/editProfile/${tokenId._id}?language=${language}&skill=${skill}`,
      config
    );

    const { data } = await axios.get(`/api/employee/profile/${tokenId._id}`);

    dispatch({
      type: EMPLOYEE_PROFILE_SUCCESS,
      payload: data,
    });

    console.log(data);
  };

export const editInfo = (title, info) => async (dispatch, getState) => {
  dispatch({
    type: EMPLOYEE_PROFILE_REQUEST,
  });

  const tokenId = JSON.parse(localStorage.getItem("userInfo"));

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenId.token}`,
    },
  };

  const { datad } = await axios.patch(
    `/api/employee/editInfo/${tokenId._id}`,
    { title, info },
    config
  );

  const { data } = await axios.get(`/api/employee/profile/${tokenId._id}`);

  dispatch({
    type: EMPLOYEE_PROFILE_SUCCESS,
    payload: data,
  });

  console.log(data);
};

export const addProfileImage = (image) => async (dispatch) => {
  dispatch({
    type: EMPLOYEE_PROFILE_REQUEST,
  });

  const tokenId = JSON.parse(localStorage.getItem("userInfo"));

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenId.token}`,
    },
  };

  const { datad } = await axios.patch(
    `/api/employee/profileImg/${tokenId._id}`,
    { image },
    config
  );

  const { data } = await axios.get(`/api/employee/profile/${tokenId._id}`);

  dispatch({
    type: EMPLOYEE_PROFILE_SUCCESS,
    payload: data,
  });

  console.log(data);
};

export const addkyc =
  (aathar, aatharSelfie, pan, gstNumber) => async (dispatch) => {
    dispatch({
      type: EMPLOYEE_PROFILE_REQUEST,
    });
    console.log(aathar);

    const tokenId = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenId.token}`,
      },
    };

    const { datad } = await axios.post(
      `/api/employee/kyc/${tokenId._id}`,
      { aathar, aatharSelfie, pan, gstNumber },
      config
    );

    const { data } = await axios.get(`/api/employee/profile/${tokenId._id}`);
    console.log(data);
    dispatch({
      type: EMPLOYEE_PROFILE_SUCCESS,
      payload: data,
    });

    console.log(data);
  };

export const addBankDetails = (ifsc, acNumber, acName) => async (dispatch) => {
  try {
    dispatch({
      type: BANK_DETAILS_REQUEST,
    });

    const tokenId = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenId.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/employee/addBank/${tokenId._id}`,
      { ifsc, acNumber, acName },
      config
    );
    console.log(data);
    dispatch({
      type: BANK_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: BANK_DETAILS_FAIL,
      error: error,
    });
  }
};

export const addPortfolio = (image, title, description) => async (dispatch) => {
  try {
    const tokenId = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenId.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/employee/addPortfolio/${tokenId._id}`,
      { image, title, description },
      config
    );
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const deletePortfolio = (id) => async (dispatch) => {
  try {
    const tokenId = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenId.token}`,
      },
    };

    const { data } = await axios.delete(
      `/api/employee/deletePortfolio/${tokenId._id}/${id}`,
      config
    );
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
