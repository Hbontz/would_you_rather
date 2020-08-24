import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

class Question extends Component {
  render() {
    const { question, user } = this.props;
    return (
      <Card>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            <img
              src={user[question.author].avatarURL}
              alt={`Avatar of ${user.name}`}
            />{" "}
            {user[question.author].name} asks
          </Card.Subtitle>
          <Card.Title>Would You rather?</Card.Title>
          <Link to={`/questions/${question.id}`}>
            <Card.Text>{question.optionOne.text} or...</Card.Text>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

function mapStateToprops(state, { qID }) {
  return {
    question: state.questions[qID],
    authedUser: state.authedUser,
    user: state.users,
  };
}

export default connect(mapStateToprops)(Question);
