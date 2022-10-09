import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userRegisterReducer,
  otpHelper,
  userLoginReducer,
  changePasswordReducer,
} from "./reducers/userReducer";
import {
  employeeProfileReducer,
  bankDetailsReducer,
  educationReducer,
  languageAndSkillReducer,
  infoReducer,
  portfolioReducer,
  PorfileImageReducer,
  employeeProfilePublicViewReducer,
} from "./reducers/employeeReducer";
import {
  EmpoyerPasswordReducer,
  EmpoyerProfileReducer,
  FindTalentsReducer,
} from "./reducers/employerReducer";
import {
  adminProfileReducer,
  AllEmployeesREducer,
  AllEmployersREducer,
  AllKycReducer,
  blockedUserReducer,
  kycStatusReducer,
} from "./reducers/adminReducer";
import {
  allJobsReducer,
  jobsDetailsReducer,
  MyJobsReducer,
  saveJobsReducer,
} from "./reducers/jobsReducer";
import { JobsDetails } from "./actions/jobsActions";
import { postProposalReducer } from "./reducers/proposalReducer";

const reducer = combineReducers({
  employee: userRegisterReducer,
  user: userLoginReducer,
  otp: otpHelper,

  employeeData: employeeProfileReducer,
  emplyeePublicData: employeeProfilePublicViewReducer,
  bankData: bankDetailsReducer,
  education: educationReducer,
  langNskill: languageAndSkillReducer,
  userInfo: infoReducer,
  portfolio: portfolioReducer,
  profileImage: PorfileImageReducer,
  changePasswords: changePasswordReducer,

  employerData: EmpoyerProfileReducer,
  employerChangePassword: EmpoyerPasswordReducer,
  findTalents: FindTalentsReducer,

  adminProfile: adminProfileReducer,
  allEmployees: AllEmployeesREducer,
  allEmployers: AllEmployersREducer,
  blockedUsers: blockedUserReducer,
  allKyc: AllKycReducer,
  kycReq: kycStatusReducer,

  myJobs: MyJobsReducer,
  jobsDetail: jobsDetailsReducer,
  allJobs: allJobsReducer,
  saveStatus: saveJobsReducer,

  postProposalStatus: postProposalReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  user: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
