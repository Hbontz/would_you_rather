import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/shared";
import { Redirect } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class CreateQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    redirect: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { optionOne, optionTwo } = this.state;
    this.props.addQuestion(optionOne, optionTwo);
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    const { optionOne, optionTwo } = this.state;
    return (
      <div>
        <Card>
          <Card.Body>
            <Card.Title>Would You rather?</Card.Title>

            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Question One"
                  value={optionOne}
                  onChange={(e) => this.setState({ optionOne: e.target.value })}
                />
                <br />
                <Form.Control
                  type="text"
                  placeholder="Question Two"
                  value={optionTwo}
                  onChange={(e) => this.setState({ optionTwo: e.target.value })}
                />
                <br />
                <Button
                  disabled={optionOne === "" || optionTwo === ""}
                  type="submit"
                >
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addQuestion: (optionOne, optionTwo) => {
      dispatch(handleAddQuestion(optionOne, optionTwo));
    },
  };
}

export default connect(null, mapDispatchToProps)(CreateQuestion);
