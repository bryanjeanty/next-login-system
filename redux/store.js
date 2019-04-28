// import npm packages
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

// import root reducer
import rootReducer from "./reducers/index";

// export store
export const initializeStore = () => {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};
