import React, { Component } from "react";
import { Link, withRouter, NavLink } from "react-router-dom";
import { logoutUser, getCurrentUser } from "./../../store/actions/authAction";
import SignedOutLinks from "./SignedOutLinks";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class Navbar extends Component {
  handleLogout = e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };

  componentDidMount() {
    this.props.getCurrentUser();
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    } else {
      this.props.history.push("/");
    }
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <nav className="nav-wrapper grey darken-3">
        <div className="container">
          {isAuthenticated ? (
            <div>
              <Link to="/home" className="brand-logo">
                Home
              </Link>
              <ul className="right">
                <li>
                  <NavLink to="/" onClick={this.handleLogout}>
                    Logout
                  </NavLink>
                </li>
                <li>{user.firstName}</li>
              </ul>
            </div>
          ) : (
            <div>
              <SignedOutLinks />
            </div>
          )}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, getCurrentUser }
)(withRouter(Navbar));
