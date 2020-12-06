import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class LogIn extends Component {
  state = {
    userId: "",
  };

  onFormSubmit = (event) => {
    const { userId } = this.state;
    const { authenticate } = this.props;
    if (userId) {
      authenticate(userId);
    } else {
      alert("Please select a user to continue");
    }
    event.preventDefault();
  };

  render() {
    const { users } = this.props;
    const { userId } = this.state;

    return (
      <div>
        <Form>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Login to continue:</Form.Label>
            <Form.Control
              as="select"
              value={userId}
              onChange={(e) => this.setState({ userId: e.target.value })}
            >
              <option value="" disabled>
                Select user
              </option>
              {Object.keys(users).map((user) => (
                <option value={user} key={user}>
                  {users[user].name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button
            className="btn"
            disabled={userId === null}
            onClick={this.onFormSubmit}
          >
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authenticate: (id) => {
      dispatch(setAuthedUser(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
