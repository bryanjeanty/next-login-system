import React, { Component } from "react";
import { connect } from "react-redux";
import Router from "next/router";
import { signup } from "../redux/actions/user";
import Layout from "../components/Layout";

class Signup extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    isDisabled: false,
    showError: false,
    message: ''
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
        this.setState({ message: user.message });
        setTimeout(() => {
           Router.replace("/signin");
        }, 350);
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
      <Layout page="signup">
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
      </Layout>
    );
  }
}

export default connect(
  ({ user }) => ({ user }),
  { signup }
)(Signup);
