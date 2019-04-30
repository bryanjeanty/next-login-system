import React from "react";
import Link from "next/link";
import { connect } from "react-redux";

const Brand = ({ title, href }) => {
  return (
    <Link href={href}>
      <a>
        <h2>{title}</h2>
      </a>
    </Link>
  );
};

const Layout = ({ children, user }) => {
  return (
    <div>
      <nav>
        <Brand href="/home" title="Music Search" />
        <ul>
          {!user ? (
            <div>
              <Link href="/signup">
                <a>Sign Up</a>
              </Link>
              <Link href="/signin">
                <a>Sign In</a>
              </Link>
            </div>
          ) : (
            <button type="submit">Sign Out</button>
          )}
        </ul>
      </nav>
      {children}
    </div>
  );
};

export default connect(
  ({ user }) => ({ user }),
  null
)(Layout);
