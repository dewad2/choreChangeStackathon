import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import history from "./history";

class Setup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      address: "",
      parent: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();

    const name = event.target.firstName.value;
    const address = event.target.address.value;
    const parent = event.target.parent.value;

    history.push({
      pathname: "/main",
      state: {
        name: this.state.name,
        address: this.state.address,
        parent: this.state.parent
      }
    });
  };

  handleName = event => {
    const name = event.target.value;
    this.setState({ name });
  };

  handleAddress = event => {
    const address = event.target.value;
    this.setState({ address });
  };

  handleParent = event => {
    const parent = event.target.value;
    this.setState({ parent });
  };

  render() {
    console.log("state", this.state);
    return (
      <div className="flex-container-2">
        <form onSubmit={this.handleSubmit}>
          <div className="flex-child-4">
            <div className="inner-title">
              <h3 id="subheader">1. Who's doing the chores?</h3>
            </div>
            <div id="inner-input">
              <input
                className="form-control"
                onChange={this.handleName}
                name="firstName"
                type="text"
                placeholder="child's name..."
              />
            </div>
          </div>
          <div className="flex-child-4">
            <div>
              <h3 id="subheader">2. Who's coughing up the change?</h3>
            </div>
            <div>
              <input
                className="form-control"
                onChange={this.handleParent}
                name="parent"
                type="text"
                placeholder="mom, dad...?"
              />
            </div>
          </div>
          <div className="flex-child-4">
            <div>
              <h3 id="subheader">3. Where's it going?</h3>
            </div>
            <div>
              <input
                className="form-control"
                onChange={this.handleAddress}
                name="address"
                type="text"
                placeholder="child's ethereum account..."
              />
            </div>
          </div>
          <div className="flex-container-2">
            <button id="home-btn" className="btn btn-info btn-md">
              Onwards!
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Setup);
