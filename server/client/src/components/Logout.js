import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/auth-action";
import { compose } from "redux"
import { Link } from "react-router-dom";

class Logout extends Component {
  handleLogout() {
    this.props.logout()
  };

  render() {
    return (
      <li class="nav--list--item">
        <Link onClick={this.handleLogout.bind(this)} to="/">
          Logout
        </Link>
      </li>
    );
  }
}

export default connect(null, actions)(Logout);
