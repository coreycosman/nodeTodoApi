import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "./Logout"

class Header extends Component {

  renderLogout() {
    return <Logout />
  }

  renderGuestUser() {
    return (
      <ul className="nav--list">
        <li className="nav--list--item">
          <Link to="/users/login">Login</Link>
        </li>

        <li className="nav--list--item">
          <Link to="/users">Signup</Link>
        </li>
      </ul>
    );
  }

  render() {
    return (
      <div className='nav'>
        <Link to="/">
          <h2 className='nav--title'>Dasha.com</h2>
        </Link>
        { this.props.loggedIn ? this.renderLogout() : this.renderGuestUser() }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.auth.loggedIn
  };
}

// export default Header
export default connect(mapStateToProps)(Header);
