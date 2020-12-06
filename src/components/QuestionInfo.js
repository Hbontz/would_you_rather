import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAnswer } from "../actions/shared";
import NotFound from "./NotFound";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import Badge from "react-bootstrap/Badge";

class QuestionInfo extends Component {
  state = {
    selectedOption: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.saveQuestionAnswer(this.state.selectedOption);
  };

  render() {
    const { question, users, authedUser } = this.props;
    if (!question) return <NotFound />;
    const { selectedOption } = this.state;
    const author = users[question.author];
    const answers = users[authedUser].answers;
    let answer;
    if (answers.hasOwnProperty(question.id)) {
      answer = answers[question.id];
    }

    const votesOptionOne =
      question && question.optionOne.votes
        ? question.optionOne.votes.length
        : 0;
    const votesOptionTwo =
      question && question.optionTwo.votes
        ? question.optionTwo.votes.length
        : 0;
    const total = votesOptionOne + votesOptionTwo;

    const percentageOne = ((votesOptionOne / total) * 100).toFixed(1);
    const percentageTwo = ((votesOptionTwo / total) * 100).toFixed(1);

    return (
      <div>
        {answer ? (
          <Card style={{ width: "30rem" }}>
            <Card.Body>
              <Card.Title className="mb-2">
                <img src={author.avatarURL} alt={`Avatar of ${author.name}`} />{" "}
                Asked by {author.name}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Results</Card.Subtitle>
              <Card.Text>Would you rather {question.optionOne.text}?</Card.Text>
              <ProgressBar now={percentageOne} label={`${percentageOne}%`} />
              <Card.Text>
                {votesOptionOne} out of {total} {"  "}
                {answer === "optionOne" ? (
                  <Badge pill variant="warning">
                    your vote
                  </Badge>
                ) : (
                  ""
                )}
              </Card.Text>
              <Card.Text>Would you rather {question.optionTwo.text}?</Card.Text>
              <ProgressBar now={percentageTwo} label={`${percentageTwo}%`} />
              <Card.Text>
                {votesOptionTwo} out of {total} {"  "}
                {answer === "optionTwo" ? (
                  <Badge pill variant="warning">
                    your vote
                  </Badge>
                ) : (
                  ""
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        ) : (
          <Card>
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted">
                <img src={author.avatarURL} alt={`Avatar of ${author.name}`} />{" "}
                {author.name} asks
              </Card.Subtitle>
              <Card.Title>Would You rather?</Card.Title>
              <Form onSubmit={this.handleSubmit}>
                <fieldset>
                  <Form.Group>
                    <Form.Check
                      onChange={(e) =>
                        this.setState({ selectedOption: e.target.value })
                      }
                      type="radio"
                      value="optionOne"
                      label={question.optionOne.text}
                      name="option"
                      id={question.optionOne.text}
                    />
                    <Form.Check
                      onChange={(e) =>
                        this.setState({ selectedOption: e.target.value })
                      }
                      type="radio"
                      value="optionTwo"
                      label={question.optionTwo.text}
                      name="option"
                      id={question.optionOne.text}
                    />
                  </Form.Group>
                  <Button disabled={selectedOption === ""} type="submit">
                    Submit
                  </Button>
                </fieldset>
              </Form>
            </Card.Body>
          </Card>
        )}
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, { match }) {
  const { id } = match.params;
  const question = questions[id] ? questions[id] : null;
  //const author = users[question.author];
  //const answers = users[authedUser].answers;
  //let answer;
  //if (answers.hasOwnProperty(question.id)) {
  //  answer = answers[question.id];
  //}

  //const votesOptionOne =
  //  question && question.optionOne.votes ? question.optionOne.votes.length : 0;
  //const votesOptionTwo =
  //  question && question.optionTwo.votes ? question.optionTwo.votes.length : 0;
  //const total = votesOptionOne + votesOptionTwo;

  //const percentageOne = ((votesOptionOne / total) * 100).toFixed(1);
  //const percentageTwo = ((votesOptionTwo / total) * 100).toFixed(1);
  return {
    question,
    users,
    authedUser,
    //author,
    //answer,
    //total,
    //percentageOne,
    //percentageTwo,
    //votesOptionOne,
    //votesOptionTwo,
  };
}

function mapDispatchToProps(dispatch, props) {
  const { id } = props.match.params;

  return {
    saveQuestionAnswer: (answer) => {
      dispatch(handleAnswer(id, answer));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionInfo);
