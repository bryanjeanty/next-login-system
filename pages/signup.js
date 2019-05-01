import React, { Component } from "react";
import { connect } from "react-redux";
import Router from "next/router";
import { signup } from "../redux/actions/user";

class Signup extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    isDisabled: false,
    showError: false
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  signup = async event => {
    event.preventDefault();

    try {
      const { email, password } = this.state;
      await this.props.signup({ email, password });

      const { user } = this.props;

      if (user.isFetching) {
        this.setState({ isDisabled: true });
      }

      if (user.email) {
        Router.replace("/signin");
      }
    } catch (error) {
      if (error) {
        console.error("error", error);
        this.catchError(error);
      }
    }
  };

  catchError = error => {
    const signupError =
      (error.response && error.response.data) || error.message;
    this.setState({ isDisabled: false, error: signupError, showError: true });
  };

  render() {
    const { email, password, isDisabled, error, showError } = this.state;

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
            value="Signup"
            onClick={this.signup}
            disabled={isDisabled}
          />
        </form>
        <div className="error">{error}</div>
        <style jsx>{`
          .error {
            display: ${showError ? "block" : "none"};
          }
        `}</style>
      </div>
    );
  }
}

export default connect(
  ({ user }) => ({ user }),
  { signup }
)(Signup);
