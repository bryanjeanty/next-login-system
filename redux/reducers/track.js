import { trackTypes } from "../actions/types/track";
import { trackState } from "../state/track";

const trackReducer = (state = trackState, action) => {
  switch (action.type) {
    case trackTypes.FETCHING:
      return { ...state, isFetching: true };
    case trackTypes.GET_TRACKLIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        trackList: action.trackList,
        message: action.message
      };
    case trackTypes.GET_TRACKLIST_ERROR:
      return { ...state, isFetching: false, message: action.message };
    case trackTypes.SEARCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        trackList: action.trackList,
        heading: "Search Results",
        message: action.message
      };
    case trackTypes.SEARCH_ERROR:
      return {
        ...state,
        isFetching: false,
        heading: "Cannot find...",
        error: action.message
      };
    default:
      return state;
  }
};

export { trackReducer };
