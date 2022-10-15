import axios from "axios";

export const axiosUserInstance = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const axiosEmployerInstance = axios.create({
  baseURL: "http://localhost:3001/api/employer",
});

export const axiosEmployeeInstance = axios.create({
  baseURL: "http://localhost:3001/api/employee",
});

export const axiosAdminInstance = axios.create({
  baseURL: "http://localhost:3001/api/admin",
});


export const axiosJobsInstance = axios.create({
  baseURL: "http://localhost:3001/api/",
});


export const axiosProposalInstance = axios.create({
  baseURL: "http://localhost:3001/api/",
});

export const axiosPaymentInstance = axios.create({
  baseURL: "http://localhost:3001/api/credit/",
});



