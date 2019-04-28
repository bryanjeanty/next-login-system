import { formTypes } from "./types/form";

const changeForm = event => dispatch => {
  return dispatch({
    type: formTypes.CHANGE,
    [event.target.name]: event.target.value
  });
};

export default changeForm;
