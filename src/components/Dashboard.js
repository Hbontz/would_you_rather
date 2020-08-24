import React, { Component } from "react";
import { connect } from "react-redux";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Question from "./Question";

class Dashboard extends Component {
  render() {
    const { answeredQuestions, unansweredQuestions } = this.props;
    return (
      <div>
        <Tabs
          defaultActiveKey="unanswered"
          transition={false}
          id="questions-tab"
        >
          <Tab eventKey="unanswered" title="Unanswered Questions">
            <div>
              {unansweredQuestions.map((qID) => (
                <div key={qID}>
                  <Question qID={qID} />
                </div>
              ))}
            </div>
          </Tab>
          <Tab eventKey="answered" title="Answered Questions">
            <div>
              {answeredQuestions.map((qID) => (
                <div key={qID}>
                  <Question qID={qID} />
                </div>
              ))}
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }) {
  const user = users[authedUser];
  const answeredQuestions = Object.keys(user.answers).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );
  const unansweredQuestions = Object.keys(questions)
    .filter((question) => !answeredQuestions.includes(question))
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);
  return {
    answeredQuestions: answeredQuestions,
    unansweredQuestions,
    authedUser,
  };
}

export default connect(mapStateToProps)(Dashboard);
