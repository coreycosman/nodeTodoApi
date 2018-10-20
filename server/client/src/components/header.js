import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div className='nav'>
        <a>
          <h2 className='nav--title'>Dasha.com</h2>
        </a>
        <ul className="nav--list">
          <li className="nav--list--item">
            <a>Login</a>
          </li>

          <li className="nav--list--item">
            <a>Signup</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Header;
