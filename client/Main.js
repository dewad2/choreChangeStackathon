import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Contract from "./ethereum/chore";
import web3 from "./ethereum/web3";
import Chart from "./components/myChart";
import { CSSTransitionGroup } from "react-transition-group";
import history from "./history";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parentAddress: "",
      change: "",
      chores: [],
      chore: "",
      complete: 0,
      choreChange: "",
      loading: false
    };
  }

  handleAddress = event => {
    this.setState({ parentAddress: event.target.value });
  };

  handleAmount = event => {
    this.setState({ change: event.target.value });
  };

  handleChore = event => {
    this.setState({ chore: event.target.value });
  };

  markComplete = () => {
    const newComplete = +this.state.complete + 1;
    this.setState({ complete: newComplete });
  };

  addChore = event => {
    event.preventDefault();

    const chores = [...this.state.chores, event.target.chore.value];

    this.setState({ chores });
    this.setState({ chore: "" });
  };

  addChange = async event => {
    event.preventDefault();

    this.setState({ loading: true });

    try {
      const accounts = await web3.eth.getAccounts();

      await Contract.methods.addChoreChange().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.change, "ether")
      });
    } catch (err) {
      console.error(err);
    }

    this.setState({ change: "" });

    const choreChange = await Contract.methods.choreChange().call();
    this.setState({ choreChange: choreChange + " wei!!!", loading: false });
  };

  getPaid = async event => {
    event.preventDefault();

    this.setState({ loading: true });

    try {
      const accounts = await web3.eth.getAccounts();

      const choreChange = await Contract.methods.choreChange().call();

      await Contract.methods
        .transferChange(this.props.location.state.address)
        .send({
          from: accounts[0],
          value: choreChange
        });
    } catch (err) {
      console.error(err);
    }

    this.setState({
      child: "",
      choreChange: "",
      chores: [],
      complete: 0,
      loading: false
    });

    history.push("/complete");
  };

  getChoreChange = async () => {
    const choreChange = await Contract.methods.choreChange().call();
    this.setState({ choreChange: choreChange + " wei!!!" });
  };

  render() {
    console.log("state", this.state);
    console.log("props", this.props.location.state.parent);
    const coming = "It's coming, it's coming!";
    const get = `Great job ${
      this.props.location.state.name
    }, you earned your chore change!`;
    const upper = this.props.location.state.name.toUpperCase();
    return (
      <div className="container">
        <div className="top">
          <h3 id="ch-head">
            Ok {this.props.location.state.parent}, time to add...
          </h3>
        </div>
        <div className="flex-container-3">
          {!this.state.choreChange ? (
            <div className="flex-child-5">
              <form onSubmit={this.addChange}>
                <div className="inner">
                  <h3 id="ch-head">the change</h3>
                </div>
                <div className="inner">
                  <input
                    className="form-control"
                    onChange={this.handleAmount}
                    type="text"
                    name="change"
                    value={this.state.change}
                    placeholder="add change in ether..."
                  />
                </div>

                <div className="inner-btn">
                  <button
                    id="home-btn"
                    className="btn btn-info btn-md"
                    disabled={this.state.loading}
                  >
                    {this.state.loading ? "filling up the pot..." : "add"}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="flex-child-5">
              <div className="inner">
                <p id="name-value">
                  {this.props.location.state.name}, finish your chores to get{" "}
                  {this.state.choreChange}
                </p>
              </div>
            </div>
          )}

          <div className="flex-child-5">
            <form onSubmit={this.addChore}>
              <div className="inner">
                <h3 id="ch-head">the chores</h3>
              </div>
              <div className="inner">
                <input
                  className="form-control"
                  onChange={this.handleChore}
                  type="text"
                  name="chore"
                  value={this.state.chore}
                  placeholder="add a chore..."
                />
              </div>

              <div className="inner-btn">
                <button id="home-btn" className="btn btn-info btn-md">
                  add
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col md-6">
            {this.state.chores.length > 0 && (
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">CHORES FOR {upper}</th>
                      <th scope="col">COMPLETE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.chores.map(chore => (
                      <tr key={chore}>
                        <th id="name-value" scope="row">
                          {chore}
                        </th>
                        <td>
                          <input type="checkbox" onClick={this.markComplete} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <br />
                {this.state.chores.length &&
                  this.state.chores.length === this.state.complete && (
                    <div>
                      <button
                        onClick={this.getPaid}
                        disabled={this.state.loading}
                        id="home-btn"
                        className="btn btn-info btn-md"
                      >
                        {this.state.loading ? <p> {coming}</p> : <p>{get}</p>}
                      </button>
                    </div>
                  )}
              </div>
            )}
          </div>

          <div className="row md-6">
            <Chart
              complete={this.state.complete}
              incomplete={this.state.chores.length - this.state.complete}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Main);
