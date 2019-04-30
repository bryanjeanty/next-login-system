import { userTypes } from "../actions/types/user";
import { userState } from "../state/user";

const userReducer = (state = userState, action) => {
  switch (action.type) {
    case userTypes.FETCHING:
      return { ...state, isFetching: true };
    case userTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        message: action.message,
        email: action.email,
        isFetching: false
      };
    case userTypes.SIGNUP_ERROR:
      return { ...state, message: action.message, isFetching: false };
    case userTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        message: action.message,
        email: action.email,
        session: true,
        isFetching: false
      };
    case userTypes.SIGNIN_ERROR:
      return {
        ...state,
        message: action.message,
        session: false,
        isFetching: false
      };
    default:
      return state;
  }
};

export { userReducer };
