import React, { Component } from "react";
import { connect } from "react-redux";
import Router from "next/router";
import { signup } from "../redux/actions/user";
import Layout from "../components/Layout";

class Signup extends Component {
  state = {
    email: "",
    password: "",
    isDisabled: false,
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

      if (user.email) {
        this.setState({ message: user.message });
        setTimeout(() => {
           Router.replace("/signin");
        }, 350);
      }
    } catch (error) {
      if (error) {
        console.error("error", error);
        this.setState({ message: error.message });
      }
    }
  };

  render() {
    const { email, password, isDisabled, message } = this.state;

    return (
      <Layout page="signup">
      <div className="form-wrapper">
        <div className="message">{message}</div>
        <div className="card form-container">
        <h5 className="card-title">Sign Up</h5>
        <form className="signup-form">
           <div className="form-group">
             <label>Email Address</label>
             <input
                id="email-input"
                className="form-control"
                name="email"
                type="email"
                autocomplete="off"
                placeholder="Enter email..."
                onChange={this.handleChange}
                value={email}
             />
             <small className="form-text text-muted">We'll never give away your email</small>
          </div>
          <div className="form-group">
             <label>Password</label>
             <input
                id="password-input"
                className="form-control"
                name="password"
                type="password"
                autocomplete="off"
                placeholder="Enter password..."
                onChange={this.handleChange}
                value={password}
             />
          </div>
          <input
            id="signup-btn"
            className="btn btn-primary"
            name="submit"
            type="submit"
            value="Sign Up"
            onClick={this.signup}
            disabled={isDisabled}
          />
        </form>
        </div>
        <style jsx>{`
           .form-wrapper {
              display: flex;
              height: 100%;
           }
           .form-container {
              border: 1px solid #ccc;
              width: 50%;
              margin: auto;
              border-radius: 0;
              padding: 1.75rem;
              box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.20);
           }
           .form-container > * {
              margin: 0.25rem 0;
           }
           .signup-form {
              width: 100%;
           }
           #signup-btn {
              border-radius: 0;
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
