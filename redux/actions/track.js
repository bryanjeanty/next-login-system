import { trackTypes } from "./types/track";
import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { MM_KEY } = publicRuntimeConfig;
const proxyUrl = "https://damp-cove-73616.herokuapp.com/";
const mmUrlBase = "https://api.musixmatch.com/ws/1.1/";
const getChartTracks = `chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${MM_KEY}`;

const getTracks = () => async dispatch => {
  dispatch({ type: trackTypes.FETCHING });
  try {
    const { data } = await axios.get(proxyUrl + mmUrlBase + getChartTracks, {
      withCredentials: false
    });
    console.log(data);
    return dispatch({
      type: trackTypes.GET_TRACKLIST_SUCCESS,
      trackList: data.message.body.track_list,
      message: "Success!"
    });
  } catch (error) {
    console.error("chart tracks error", error);
    return dispatch({
      type: trackTypes.GET_TRACKLIST_ERROR,
      message: error.message
    });
  }
};

const searchTracks = trackTitle => async dispatch => {
  dispatch({ type: trackTypes.FETCHING });
  try {
    console.log(trackTitle);
    const getTrackSearch = `track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${MM_KEY}`;
    const { data } = await axios.get(proxyUrl + mmUrlBase + getTrackSearch, {
      withCredentials: false
    });
    console.log(data);
    return dispatch({
      type: trackTypes.SEARCH_SUCCESS,
      trackList: data.message.body.track_list,
      message: "Success!"
    });
  } catch (error) {
    console.error("search track error", error);
    return dispatch({
      type: trackTypes.SEARCH_ERROR,
      message: error.message
    });
  }
};

export { getTracks, searchTracks };
