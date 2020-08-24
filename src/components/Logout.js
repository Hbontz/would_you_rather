import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { clearAuthedUser } from "../actions/authedUser";

class Logout extends Component {
  componentDidMount() {
    this.props.dispatch(clearAuthedUser());
  }
  render() {
    return <Redirect to="/" />;
  }
}

export default connect()(Logout);
