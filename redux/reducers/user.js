import { userTypes } from "../actions/types/user";
import { userState } from "../state/user";

const userReducer = (state = userState, action) => {
  switch (action.type) {
    case userTypes.FETCHING:
      return { ...state, isFetching: true };
    case userTypes.SIGNUP_SUCCESS:
      return { ...state, message: action.message, email: action.email };
    case userTypes.SIGNUP_ERROR:
      return { ...state, message: action.message };
    case userTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        message: action.message,
        email: action.email,
        sessionStarted: true
      };
    case userTypes.SIGNIN_ERROR:
      return { ...state, message: action.message };
    default:
      return state;
  }
};

export { userReducer };
