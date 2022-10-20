import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userRegisterReducer,
  otpHelper,
  userLoginReducer,
  changePasswordReducer,
  ForgotPasswordReducer,
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
  deleteMessageReducer,
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
  jobsPostReducer,
  MyJobsReducer,
  saveJobsReducer,
} from "./reducers/jobsReducer";
import { JobsDetails } from "./actions/jobsActions";
import {
  acceptProposalReducer,
  MyProposalReducer,
  postProposalReducer,
  viewProposalReducer,
} from "./reducers/proposalReducer";
import { acceptProposal } from "./actions/proposalActions";
import {
  PURCHASE_hISTORY_REQUEST,
  PURCHASE_hISTORY_FAIL,
  PURCHASE_hISTORY_SUCCUSS,
} from "./contants/paymentConstants";
import { purchaseHistoryReducer } from "./reducers/purchaseReducer";
import { callReducer, myChatsReducer, myRoomsReducer } from "./reducers/chatReducer";

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
  forgotPassword: ForgotPasswordReducer,

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
  jobPost: jobsPostReducer,

  postProposalStatus: postProposalReducer,
  myProposalsData: MyProposalReducer,
  viewProposal: viewProposalReducer,
  acceptProposal: acceptProposalReducer,

  deleteMessage: deleteMessageReducer,

  purchaseHistory: purchaseHistoryReducer,

  myRooms: myRoomsReducer,
  myChats: myChatsReducer,
  callVideo: callReducer,
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
