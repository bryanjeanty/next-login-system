import { trackTypes } from "./types/track";
import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { MM_KEY } = publicRuntimeConfig;
const proxyUrl = "https://damp-cove-73616.herokuapp.com/";
const mmUrl =
  "https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=";

const getTracks = () => async dispatch => {
  dispatch({ type: trackTypes.FETCHING });
  try {
    const { data } = await axios.get(proxyUrl + mmUrl + MM_KEY, {
      withCredentials: false
    });
    console.log(data);
    return dispatch({
      type: trackTypes.GET_TRACKLIST_SUCCESS,
      trackList: data,
      message: "Success!"
    });
  } catch (error) {
    console.log(error);
    return dispatch({
      type: trackTypes.GET_TRACKLIST_ERROR,
      message: error.message
    });
  }
};

export { getTracks };
