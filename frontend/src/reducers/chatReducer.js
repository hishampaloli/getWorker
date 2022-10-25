import {
  MY_ROOMS_FAIL,
  MY_ROOMS_REQUEST,
  MY_ROOMS_SUCCESS,
  MY_CHATS_FAIL,
  MY_CHATS_REQUEST,
  MY_CHATS_SUCCESS,
  CALL_REQUEST,
  CALL_SUCCESS,
  CALL_FAIL,
  HELP_CHAT_REQUEST,
  HELP_CHAT_SUCCESS,
  HELP_CHAT_FAIL,
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

export const myChatsReducer = (state = {}, action) => {
  switch (action.type) {
    case MY_CHATS_REQUEST:
      return { loading: true };

    case MY_CHATS_SUCCESS:
      return { loading: false, chat: action.payload };

    case MY_CHATS_FAIL:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};


export const myHelpChatsReducer = (state = {}, action) => {
  switch (action.type) {
    case HELP_CHAT_REQUEST:
      return { loading: true };

    case HELP_CHAT_SUCCESS:
      return { loading: false, chatData: action.payload };

    case HELP_CHAT_FAIL:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

export const callReducer = (state = {}, action) => {
  switch (action.type) {
    case CALL_REQUEST:
      return { loading: true, onCall: false, callRej: false };

    case CALL_SUCCESS:
      return { loading: false, onCall: true };

    case CALL_FAIL:
      return { loading: false, callRej: true };

    default:
      return state;
  }
};
