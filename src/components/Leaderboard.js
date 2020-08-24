import React from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";

const Leaderboard = (props) => {
  const { users } = props;
  return (
    <div>
      {users.map((user, i) => (
        <Card key={i}>
          <img alt="avatar" className="avatar" src={user.avatarURL} />
          <Card.Title>{user.name}</Card.Title>
          <Card.Text>{Object.keys(user.answers).length} Answered</Card.Text>
          <Card.Text>{user.questions.length} Created</Card.Text>
          <Card.Text>
            {Object.keys(user.answers).length + user.questions.length} Total
          </Card.Text>
        </Card>
      ))}
    </div>
  );
};

function mapStateToProps({ users }) {
  const userScore = (users) =>
    Object.keys(users.answers).length + users.questions.length;
  return {
    users: Object.values(users).sort((a, b) => userScore(b) - userScore(a)),
  };
}

export default connect(mapStateToProps)(Leaderboard);
