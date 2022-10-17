import {
  MY_ROOMS_FAIL,
  MY_ROOMS_REQUEST,
  MY_ROOMS_SUCCESS,
} from "../contants/chatConstants";

export const myRoomsReducer = (state = {}, action) => {
  switch (action.type) {
    case MY_ROOMS_REQUEST:
      return { loading: true };

    case MY_ROOMS_SUCCESS:
      return { loading: false, data: action.payload };

    case MY_ROOMS_FAIL:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};
