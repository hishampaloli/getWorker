import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userRegisterReducer,
  otpHelper,
  userLoginReducer,
} from "./reducers/userReducer";
import {
  employeeProfileReducer,
  bankDetailsReducer,
  educationReducer,
  languageAndSkillReducer,
  infoReducer,
  portfolioReducer,
  PorfileImageReducer,
} from "./reducers/employeeReducer";

const reducer = combineReducers({
  employee: userRegisterReducer,
  user: userLoginReducer,
  otp: otpHelper,
  employeeData: employeeProfileReducer,
  bankData: bankDetailsReducer,
  education: educationReducer,
  langNskill: languageAndSkillReducer,
  userInfo: infoReducer,
  portfolio: portfolioReducer,
  profileImage: PorfileImageReducer,
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
