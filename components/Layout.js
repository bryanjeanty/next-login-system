import React, { Fragment } from "react";
import Link from "next/link";
import Router from "next/router";
import { connect } from "react-redux";
import { signout } from "../redux/actions/user";
import { WINDOW_USER_VAR } from "../lib/auth";

const Brand = ({ title, href }) => {
  return (
    <Link href={href}>
      <a>
        <h2>{title}</h2>
      </a>
    </Link>
  );
};

const Layout = ({ children, user, signout }) => {
  const handleClick = () => {
    try {
      signout();
      window[WINDOW_USER_VAR] = {};
      Router.replace("/signin");
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div>
      <nav>
        <Brand href="/" title="Music Search" />
        <ul>
          {Object.keys(user.email).length == 0 ? (
            <Fragment>
              <Link href="/signup">
                <a>Sign Up</a>
              </Link>
              <Link href="/signin">
                <a>Sign In</a>
              </Link>
            </Fragment>
          ) : (
            <input
              value="Sign Out"
              onClick={() => handleClick()}
              type="submit"
            />
          )}
        </ul>
      </nav>
      {children}
    </div>
  );
};

export default connect(
  ({ user }) => ({ user }),
  { signout }
)(Layout);
