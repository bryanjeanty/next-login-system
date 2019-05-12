import React, { Component } from "react";
import Router from "next/router";
import { connect } from "react-redux";
import { signin } from "../redux/actions/user";
import { WINDOW_USER_VAR } from "../lib/auth";
import Layout from "../components/Layout";

class Signin extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    showError: false,
    isDisabled: false
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  signin = async event => {
    event.preventDefault();

    try {
      const { email, password } = this.state;
      await this.props.signin({ email, password });

      const { user } = this.props;
      if (user.isFetching) {
        this.setState({ isDisabled: true });
      }

      const { session } = user;
      if (session) {
        window[WINDOW_USER_VAR] = user || {};
        Router.replace("/");
      }
    } catch (error) {
      console.error("error", error);
      return this.catchError(error);
    }
  };

  catchError = error => {
    const errorMessage = error.message;
    this.setState({ isDisabled: false, error: errorMessage, showError: true });
  };

  render() {
    const { email, password, isDisabled, error, showError } = this.state;

    return (
      <Layout page="signin">
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
        <div className="error">{error}</div>
        <style jsx>{`
          .error {
            display: ${showError ? "block" : "none"};
          }
        `}</style>
      </div>
      </Layout>
    );
  }
}

export default connect(
  ({ user }) => ({ user }),
  { signin }
)(Signin);
