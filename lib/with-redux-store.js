// import npm packages
import React, { Component } from "react";

// import store function
import { initializeStore } from "../redux/store";

// create initial variables
const isServer = typeof window === "undefined";
const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";
const getOrCreateStore = initialState => {
  // initialize new redux store when on server
  if (isServer) {
    return initializeStore(initialState);
  }

  // setup redux store on the window object, if there isn't one already
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
};

// create the higher-order function (component) which takes a function (component) and returns a function (component)
export default App => {
  return class AppWithRedux extends Component {
    static async getInitialProps(appContext) {
      // using this function allows you to set a custom initial state
      const reduxStore = getOrCreateStore();

      // set the state to the initial props of all pages
      appContext.ctx.reduxStore = reduxStore;

      let appProps = {};
      if (typeof App.getInitialProps === "function") {
        appProps = await App.getInitialProps(appContext);
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState()
      };
    }

    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    render() {
      return <App {...this.props} reduxStore={this.reduxStore} />;
    }
  };
};
