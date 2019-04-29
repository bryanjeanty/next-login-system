import React, { Component } from "react";
import { connect } from "react-redux";
import Router from "next/router";
import { signup } from "../redux/actions/user";

class Signup extends Component {
  state = {
    email: "",
    password: "",
    buttonClicked: false
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  signup = event => {
    event.preventDefault();
    this.setState({ buttonClick: true });

    const { email, password } = this.state;

    try {
      this.props.signup({ email, password });

      const { user } = this.props;
      if (user) {
        console.log(user);
        Router.replace("/signin");
      }
    } catch (error) {
      if (error) {
        console.error("error", error);
      }
    }
  };

  render() {
    const { email, password } = this.state;

    return (
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
        />
      </form>
    );
  }
}

export default connect(
  ({ user }) => ({ user }),
  { signup }
)(Signup);
