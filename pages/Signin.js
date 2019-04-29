import React, { Component } from "react";
import Router from "next/router";
import { connect } from "react-redux";
import { signin } from "../redux/actions/user";

class Signin extends Component {
  state = {
    email: "",
    password: "",
    isDisabled: false
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  signin = event => {
    event.preventDefault();
    const { email, password } = this.state;

    const { user } = this.props;
    if (user.isFetching) {
      this.setState({ isDisabled: true });
    }

    try {
      this.props.signin({ email, password });
      const { sessionStarted } = user;
      if (sessionStarted) {
        Router.push("/feed");
      }
    } catch (error) {
      if (error) {
        return (Error = () => {
          return <div>{error.message}</div>;
        });
      }
    }
  };

  render() {
    const { email, password, isDisabled } = this.state;

    return (
      <div>
        <form>
          <input
            name="email"
            type="email"
            placeholder="Enter email..."
            onChange={this.handleChange}
            value={email}
          />
          <input
            name="password"
            type="password"
            placeholder="Enter password..."
            onChange={this.handleChange}
            value={password}
          />
          <input
            name="submit"
            type="submit"
            value="Signin"
            disabled={isDisabled}
            onClick={this.signin}
          />
        </form>
        <Error />
      </div>
    );
  }
}

export default connect(
  ({ user }) => ({ user }),
  { signin }
)(Signin);
