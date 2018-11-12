import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import Logout from "./Logout"

class Header extends Component {

  // renderButton() {
  //   if (this.props.registered !== '' || this.props.loggedIn !== '') {
  //     return (
  //     <li className="nav--list--item">
  //         <button>
  //           Logout
  //         </button>
  //       </li>
  //     );
  //   }
  // }
  // renderLogout() {
  //   if (this.props.registered !== '' || this.props.loggedIn !== '') {
  //     return <Logout />
  //   }
  // }

  render() {
    return (
      <div className='nav'>
        <a>
          <h2 className='nav--title'>Dasha.com</h2>
        </a>
        <ul className="nav--list">
          <li className="nav--list--item">
            <Link to="/users/login">Login</Link>
          </li>

          <li className="nav--list--item">
            <Link to="/users">Signup</Link>
          </li>
        </ul>
      </div>
    );
  }
}

// { this.renderButton() }
function mapStateToProps(state) {
  return {
    // registered: state.auth.authenticated,
    loggedIn: state.login.loggedIn
  };
}

export default Header
// export default connect(mapStateToProps)(Header);
