import axios from "axios";
import {
  BANK_DETAILS_FAIL,
  BANK_DETAILS_REQUEST,
  BANK_DETAILS_SUCCESS,
  EDUCATION_REQUEST,
  EDUCATION_SUCCESS,
  EMPLOYEE_PROFILE_FAIL,
  EMPLOYEE_PROFILE_PUBLIC_FAIL,
  EMPLOYEE_PROFILE_PUBLIC_REQUEST,
  EMPLOYEE_PROFILE_PUBLIC_SUCCESS,
  EMPLOYEE_PROFILE_REQUEST,
  EMPLOYEE_PROFILE_SUCCESS,
  INFO_FAIL,
  INFO_REQUEST,
  INFO_SUCCESS,
  PORTFOLIO_FAIL,
  PORTFOLIO_REQUEST,
  PORTFOLIO_SUCCESS,
  PROFILE_PIC_FAIL,
  PROFILE_PIC_REQUEST,
  PROFILE_PIC_SUCCESS,
  SKILL_N_LANGUAGE_FAIL,
  SKILL_N_LANGUAGE_REQUEST,
  SKILL_N_LANGUAGE_SUCCESS,
} from "../contants/employeeConstants.js";

export const getEmployeeProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: EMPLOYEE_PROFILE_REQUEST,
    });

    const id = JSON.parse(localStorage.getItem("userInfo"));

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

export const deleteEducation = (id, userId) => async (dispatch, getState) => {
  dispatch({
    type: EDUCATION_REQUEST,
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

  const newArray = getState().employeeData.userData.educations.filter((el) => {
    return el._id != id;
  });

  getState().employeeData.userData.educations = newArray;

  dispatch({
    type: EDUCATION_SUCCESS,
  });
};

export const addLanguageOrSkill =
  (language, skill) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SKILL_N_LANGUAGE_REQUEST,
      });

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
        dispatch({
          type: SKILL_N_LANGUAGE_SUCCESS,
        });
        if (skill) {
          getState().employeeData.userData.skills.push({ skill: skill });
        }

        if (language) {
          getState().employeeData.userData.languages.push({
            language: language,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: SKILL_N_LANGUAGE_FAIL,
      });
    }
  };

export const deleteLanguageOrSkill =
  (language = "", skill = "") =>
  async (dispatch, getState) => {
    dispatch({
      type: SKILL_N_LANGUAGE_REQUEST,
    });
    const tokenId = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenId.token}`,
      },
    };

    const { data } = await axios.delete(
      `/api/employee/editProfile/${tokenId._id}?language=${language}&skill=${skill}`,
      config
    );

    if (language) {
      const newArray = getState().employeeData.userData.languages.filter(
        (el) => {
          return el.language != language;
        }
      );
      getState().employeeData.userData.languages = newArray;
    }

    if (skill) {
      const newArray = getState().employeeData.userData.skills.filter((el) => {
        return el.skill != skill;
      });
      getState().employeeData.userData.skills = newArray;
    }

    dispatch({
      type: SKILL_N_LANGUAGE_SUCCESS,
    });
  };

export const editInfo = (title, info) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INFO_REQUEST,
    });

    const tokenId = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenId.token}`,
      },
    };

    const { data } = await axios.patch(
      `/api/employee/editInfo/${tokenId._id}`,
      { title, info },
      config
    );

    dispatch({
      type: INFO_SUCCESS,
    });

    if (data) {
      if (title) {
        getState().employeeData.userData.userTitle = title;
        console.log(getState().employeeData.userData.userTitle);
      }
      if (info) {
        getState().employeeData.userData.userInfo = info;
      }
    }
  } catch (error) {
    dispatch({
      type: INFO_FAIL,
    });
  }
};

export const addProfileImage = (image) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_PIC_REQUEST,
    });

    const tokenId = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenId.token}`,
      },
    };

    const { data } = await axios.patch(
      `/api/employee/profileImg/${tokenId._id}`,
      { image },
      config
    );

    if (data) {
      getState().employeeData.userData.image = image;
      dispatch({
        type: PROFILE_PIC_SUCCESS,
      });
    }
  } catch (error) {
    dispatch({
      type: PROFILE_PIC_FAIL,
    });
  }
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

export const addPortfolio =
  (image, title, description) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PORTFOLIO_REQUEST,
      });

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

      if (data) {
        dispatch({
          type: PORTFOLIO_SUCCESS,
        });

        getState().employeeData.userData.portfolios.push({
          Image: image,
          description: description,
          title: title,
          _id: tokenId._id,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: PORTFOLIO_FAIL,
      });
    }
  };

export const deletePortfolio = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PORTFOLIO_REQUEST,
    });

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

    if (data) {
      const newArray = getState().employeeData.userData.portfolios.filter(
        (el) => {
          return el._id != id;
        }
      );
      getState().employeeData.userData.portfolios = newArray;

      dispatch({
        type: PORTFOLIO_SUCCESS,
      });
    }
  } catch (error) {
    console.log(error);

    dispatch({
      type: PORTFOLIO_FAIL,
    });
  }
};



export const getEmployeeProfileView = (id) => async (dispatch) => {
  try {
    dispatch({
      type: EMPLOYEE_PROFILE_PUBLIC_REQUEST,
    });

 

    const { data } = await axios.get(`/api/employee/profile/${id}`);

    dispatch({
      type: EMPLOYEE_PROFILE_PUBLIC_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type:  EMPLOYEE_PROFILE_PUBLIC_FAIL,
      error: error,
    });
  }
};
