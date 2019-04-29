import { userTypes } from "../actions/types/user";
import { userState } from "../state/user";

const userReducer = (state = userState, action) => {
  switch (action.type) {
    case userTypes.SIGNUP_SUCCESS:
      return { ...state, message: action.message, user: action.user };
    case userTypes.SIGNUP_ERROR:
      return { ...state, message: action.message };
    default:
      return state;
  }
};

export { userReducer };
