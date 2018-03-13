import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import history from "./history";

class Welcome extends Component {
  nextPage = event => {
    history.push("/setup");
  };

  render() {
    console.log("state", this.state);
    return (
      <div className="flex-container">
        <div className="flex-child-1" id="home-title">
          <h1 id="header">Chore Change.</h1>
        </div>
        <div className="flex-child-2">
          <h3 id="subheader">do your chores. get paid.</h3>
        </div>
        <div className="flex-child-3">
          <button
            onClick={this.nextPage}
            id="home-btn"
            className="btn btn-info btn-md"
          >
            Let's get started{" "}
          </button>
        </div>
        <div className="flex-child-3a">
          <div className="quote">
            <p>
              "Make your bed, do the dishes, then you'll have change for all
              your wishes"
            </p>
          </div>
          <div className="quote">
            <br />
            <p id="mom">@MOM</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Welcome);
