import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Welcome from "./Welcome";
import Main from "./Main";
import Setup from "./Setup";
import Complete from "./Complete";

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/setup" component={Setup} />
          <Route path="/main" component={Main} />
          <Route path="/complete" component={Complete} />
        </Switch>
      </div>
    );
  }
}
