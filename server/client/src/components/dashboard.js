import React, { Component } from "react";
import requireAuth from "./requireAuth";

class Dashboard extends Component {
  render() {
    return (
      <div className="background">
        dashboard
      </div>
    );
  }
}

export default requireAuth(Dashboard);
