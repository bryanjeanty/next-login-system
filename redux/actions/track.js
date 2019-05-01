import { trackTypes } from "./types/track";
import axios from "axios";

const getTracks = () => async dispatch => {
  dispatch({ type: trackTypes.FETCHING });
  try {
    const { data } = await axios.get();
    return dispatch({
      type: trackTypes.GET_TRACKLIST_SUCCESS,
      trackList: data,
      message: "Success!"
    });
  } catch (error) {
    return dispatch({
      type: trackTypes.GET_TRACKLIST_ERROR,
      message: error.message
    });
  }
};

export { getTracks };
