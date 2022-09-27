import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userRegisterReducer, otpHelper, userLoginReducer } from "./reducers/userReducer";

const reducer = combineReducers({
  employee: userRegisterReducer,
  user: userLoginReducer,
  otp: otpHelper,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

  const initialState = {

    user: { userInfo: userInfoFromStorage },
  }


const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
