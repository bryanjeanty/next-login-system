import React, { Component } from "react";
import { connect } from "react-redux";
import { WINDOW_USER_VAR } from "../lib/auth";
import { getUsers } from "../redux/actions/user";

class Index extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const { user } = this.props;

    const sessionEmail = window[WINDOW_USER_VAR].email || user.email;

    let userName;
    if (sessionEmail) {
      const regName = sessionEmail.toString().split("@")[0];
      userName = regName.charAt(0).toUpperCase() + regName.slice(1);
    }

    const UsersList = () => {
      return user.usersList.map(userItem => {
        const regNameItem = userItem.email.toString().split("@")[0];
        const userNameItem =
          regNameItem.charAt(0).toUpperCase() + regNameItem.slice(1);

        return <li key={userItem._id}>{userNameItem}</li>;
      });
    };

    return Object.keys(sessionEmail).length === 0 ? (
      <div>
        <h3>Welcome, Guest!</h3>
        <ul />
      </div>
    ) : (
      <div>
        <h3>Welcome, {userName}</h3>
        <ul>
          <UsersList />
        </ul>
      </div>
    );
  }
}

export default connect(
  ({ user }) => ({ user }),
  { getUsers }
)(Index);
