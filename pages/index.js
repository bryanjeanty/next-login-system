import React, { Component } from "react";
import { connect } from "react-redux";

class Index extends Component {
  render() {
    const { email } = this.props.user;

    if (email) {
      const userName = email.split("@")[0].toUpperCase();
    }

    return email ? <h3>`Welcome, ${userName}`</h3> : <h3>'Welcome, Guest!'</h3>;
  }
}

export default connect(
  ({ user }) => ({ user }),
  null
)(Index);
