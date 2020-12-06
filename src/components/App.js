import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import LogIn from "./LogIn";
import Logout from "./Logout";
import NavBar from "./NavBar";
import Leaderboard from "./Leaderboard";
import CreateQuestion from "./CreateQuestion";
import QuestionInfo from "./QuestionInfo";
import NotFound from "./NotFound";

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { noAuthedUser } = this.props;
    return (
      <Router>
        <NavBar />
        <div className="main-content">
          <Switch>
            {noAuthedUser ? (
              <Route path="/" component={LogIn} />
            ) : (
              <Route>
                <Route path="/" exact component={Dashboard} />
                <Route path="/leaderboard" component={Leaderboard} />
                <Route path="/add" component={CreateQuestion} />
                <Route path="/questions/:id" component={QuestionInfo} />
                <Route exact path="/logout" component={Logout} />
                
              </Route>
            )}
          </Switch>
        </div>
      </Router>
    );
  }
}
function mapStateToProps({ authedUser }) {
  return {
    noAuthedUser: authedUser === null,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    handleInitialData: () => {
      dispatch(handleInitialData());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
