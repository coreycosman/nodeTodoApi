import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./header";
import Dashboard from "./dashboard";
import Landing from "./landing";
import  '../sass/css-loader.scss';
import * as actions from "../actions/index";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route path="/" component={ Landing } exact />
            <Route path="/dashboard" component={ Dashboard } exact />
          </div>
        </BrowserRouter>
      </div>
    );
  }
};

export default connect(null, actions)(App);
