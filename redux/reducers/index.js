import { combineReducers } from "redux";
import { userReducer } from "./user";
import { trackReducer } from "./track";

export default combineReducers({ user: userReducer, track: trackReducer });
