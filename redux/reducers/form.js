import { formTypes } from "../actions/types";
import { formState } from "../state/form";

const formReducer = (state = formState, action) => {
  switch (action.type) {
    case formTypes.CHANGE:
      return { ...state, email: action.email, password: action.password };
    default:
      return state;
  }
};

export default formReducer;
