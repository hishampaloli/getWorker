import axios from "axios";
import {
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

export const addEducation = (education) => async (dispatch) => {
    dispatch({
        type: EMPLOYEE_PROFILE_REQUEST,
      });
  
  const id = JSON.parse(localStorage.getItem("userInfo"));

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${id.token}`,
    },
  };

  const { datad } = await axios.post(
    `/api/employee/education/${id._id}`,
    { education },
    config
  );

  const { data } = await axios.get(`/api/employee/profile/${id._id}`);

  dispatch({
    type: EMPLOYEE_PROFILE_SUCCESS,
    payload: data,
  });
console.log(data);

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



export const addLanguageOrSkill = (language, skill) => async (dispatch) => {
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

const { datad } = await axios.post(
  `/api/employee/editProfile/${tokenId._id}`,
  {language, skill},
  config
);

const { data } = await axios.get(`/api/employee/profile/${tokenId._id}`);

dispatch({
  type: EMPLOYEE_PROFILE_SUCCESS,
  payload: data,
});

console.log(data);
};

export const deleteLanguageOrSkill = (language = '', skill = '') => async (dispatch) => {
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
}
