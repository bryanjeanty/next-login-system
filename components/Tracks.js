import React, { Component } from "react";
import { connect } from "react-redux";
import { getTracks } from "../redux/actions/track";

class Tracks extends Component {
  componentDidMount() {
    this.props.getTracks();
  }

  //   getTracks = () => {
  //     console.log(this.state);
  //   };

  render() {
    return <div>Tracks</div>;
  }
}

export default connect(
  ({ track }) => ({ track }),
  { getTracks }
)(Tracks);
