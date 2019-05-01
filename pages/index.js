import React, { Component } from "react";
import { connect } from "react-redux";
import { WINDOW_USER_VAR } from "../lib/auth";

class Index extends Component {
  render() {
    const { email } = this.props.user;

    const sessionEmail = window[WINDOW_USER_VAR].email || email;

    let userName;
    if (sessionEmail) {
      const regName = sessionEmail.toString().split("@")[0];
      userName = regName.charAt(0).toUpperCase() + regName.slice(1);
    }

    return Object.keys(sessionEmail).length === 0 ? (
      <h3>Welcome, Guest!</h3>
    ) : (
      <h3>Welcome, {userName}</h3>
    );
  }
}

export default connect(
  ({ user }) => ({ user }),
  null
)(Index);
