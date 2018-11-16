// library
import React, { Component } from 'react';
import { BrowserRouter, Route, history } from "react-router-dom";
import { connect } from "react-redux";

// components
import Header from "./Header";
// routes
import Dashboard from "./Dashboard";
import Landing from "./Landing";
import Signup from "./Signup";
import Login from "./Login";

// local
import  '../sass/css-loader.scss';
import * as actions from "../actions/index";



class App extends Component {
  // componentDidMount() {
  //   this.props.fetchUser();
  // }

  render() {
    return (
      <div>
        <BrowserRouter >
          <div>
            <Header />
            <Route path="/" component={ Landing } exact />
            <Route path="/users" component={ Signup } exact />
            <Route path="/users/login" component={ Login } exact />
            <Route path="/dashboard" component={ Dashboard } exact />
          </div>
        </BrowserRouter>
      </div>
    );
  }
};

// function mapStateToProps(state) {
//   return { auth: state.auth.authenticated }
// }

export default connect(null, actions)(App);
