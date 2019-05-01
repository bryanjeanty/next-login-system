import React, { Component } from "react";
import { trackState } from "../redux/state/track";

class Tracks extends Component {
  state = trackState;

  componentDidMount() {
    this.getTracks();
  }

  getTracks = () => {
    console.log(this.state);
  };

  render() {
    return <div>Tracks</div>;
  }
}

export default Tracks;
