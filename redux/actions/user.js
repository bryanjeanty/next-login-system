import { userTypes } from "./types/user";
import axios from "axios";

const signup = ({ email, password }) => async dispatch => {
  dispatch({ type: userTypes.FETCHING });
  try {
    const userData = await axios.post("/api/users/signup", {
      email,
      password
    });
    return dispatch({
      type: userTypes.SIGNUP_SUCCESS,
      message: userData.message,
      email: userData.email
    });
  } catch (error) {
    return dispatch({
      type: userTypes.SIGNUP_ERROR,
      message: error.message
    });
  }
};

const signin = ({ email, password }) => async dispatch => {
  dispatch({ type: userTypes.FETCHING });
  try {
    const userData = await axios.post("/api/session/signin", {
      email,
      password
    });
    return dispatch({
      type: userTypes.SIGNIN_SUCCESS,
      message: userData.message,
      email: userData.email
    });
  } catch (error) {
    return dispatch({
      type: userTypes.SIGNIN_ERROR,
      message: error.message
    });
  }
};

export { signup, signin };
