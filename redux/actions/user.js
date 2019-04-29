import { userTypes } from "./types/user";
import axios from "axios";

const signup = ({ email, password }) => async dispatch => {
  try {
    const user = await axios.post("/api/users/signup", { email, password });
    return dispatch({
      type: userTypes.SIGNUP_SUCCESS,
      message: "signup successful!",
      user
    });
  } catch (error) {
    return dispatch({ type: userTypes.SIGNUP_ERROR, message: error.message });
  }
};

export { signup };
