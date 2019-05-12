import React, { Fragment } from "react";
import Link from "next/link";
import { Container } from "reactstrap";
import { connect } from "react-redux";
import { signout } from "../redux/actions/user";
import { WINDOW_USER_VAR } from "../lib/auth";

const Layout = ({ children, user, signout, page }) => {
  const handleClick = () => {
    try {
      signout();
      window[WINDOW_USER_VAR] = {};
    } catch (error) {
      console.error("error", error);
    }
  };

  const Brand = ({ title, href }) => {
     return (
        <div id="brand">
           <Link href={href}>
              <a id="brand-link">
                 <h2 id="brand-title">{title}</h2>
              </a>
           </Link>
       <style jsx>{`
          #brand {
             width: 25%;
          }
          #brand-link {
             color: #eee;
             text-decoration: none;
          }
          #brand-link:hover {
             color: #cdcdcd;
          }
       `}</style>
       </div>
     );
  };

  const sessionEmail = window[WINDOW_USER_VAR].email || user.email;

  return (
    <Fragment>
      <nav className="navbar">
        <Container>
        <div className="auth-nav">
        <div className="brand-container">
           <Brand href="/" title="Music Search" />
        </div>
        <Fragment>
          {Object.keys(sessionEmail).length === 0 ? (
           <Fragment>
              <div className="signup">
                 <Link href="/signup">
                   <a className="navlinks">Sign Up</a>
                 </Link>
              </div>
              <div className="signin">
                 <Link href="/signin">
                   <a className="navlinks">Sign In</a>
                 </Link>
              </div>
           </Fragment>
          ) : (
            <input
              value="Sign Out"
              onClick={() => handleClick()}
              type="submit"
            />
          )}
        </Fragment>
        </div>
        </Container>
      </nav>
      <Container>
         {children}
      </Container>
      <style jsx>{`
         .navbar {
            background-color: #222;
         }
         .auth-nav {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(10, 1fr);
            grid-gap: 0.5rem;
         }
         .brand-container {
            grid-column: 1 / 9;
         }
         .signup {
            grid-column: 10 / 11;
            display: ${ (page && page === 'signup') ? 'none' : 'flex' };
         }
         .signin {
            grid-column: 10 / 11;
            display: ${ (page && page === 'signin') ? 'none' : 'flex' };
         }
         .navlinks {
            margin: auto;
            padding: 0.5rem 0.6rem;
            background-image: linear-gradient(to bottom, #eee, #cdcdcd);
            font-weight: 550;
            color: #222;
            text-decoration: none;
            text-align: center;
         }
         .navlinks:hover {
            background-image: none;
            border: 0.75px solid #eee;
            color: #eee;
         }
      `}</style>
    </Fragment>
  );
};

export default connect(
  ({ user }) => ({ user }),
  { signout }
)(Layout);
