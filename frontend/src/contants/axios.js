import axios from "axios";

const axiosBaseUrl = "http://localhost:3001/api"

export const axiosUserInstance = axios.create({
  baseURL: axiosBaseUrl,
});

export const axiosEmployerInstance = axios.create({
  baseURL: `${axiosBaseUrl}/employer`,
});

export const axiosEmployeeInstance = axios.create({
  baseURL: `${axiosBaseUrl}/employee`,
});

export const axiosAdminInstance = axios.create({
  baseURL: `${axiosBaseUrl}/admin`,
});


export const axiosJobsInstance = axios.create({
  baseURL: axiosBaseUrl,
});


export const axiosProposalInstance = axios.create({
  baseURL: axiosBaseUrl,
});

export const axiosPaymentInstance = axios.create({
  baseURL: `${axiosBaseUrl}/credit/`,
});

export const axiosChatInstance = axios.create({
  baseURL: `${axiosBaseUrl}/chat/`,
})


