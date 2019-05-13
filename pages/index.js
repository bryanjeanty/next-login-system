import React, { Component } from "react";
import { connect } from "react-redux";
import { WINDOW_USER_VAR } from "../lib/auth";
import { getUsers } from "../redux/actions/user";
import Tracks from "../components/Tracks";
import Search from "../components/Search";
import Layout from "../components/Layout";

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

    return (
       <Layout page="index">
          <div className="index-container">
             {Object.keys(sessionEmail).length === 0 ? (
                <div>
                   <h5>Welcome, Guest!</h5>
                </div>
                ) : (
                <div>
                   <h5>Welcome, {userName}</h5>
                   <ul>
                      <UsersList />
                   </ul>
                </div>
                )
             }
             <Search />
             <Tracks />
          </div>
          <style jsx>{`
             .index-container {
                padding-top: 5rem;
             }
          `}</style>
       </Layout>
    )
  }
}

export default connect(
  ({ user }) => ({ user }),
  { getUsers }
)(Index);
