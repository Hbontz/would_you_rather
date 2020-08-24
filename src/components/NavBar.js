import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import React, { Component, Fragment } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

class NavBar extends Component {
  state = {
    navOpen: false,
  };

  render() {
    const { authedUser, user } = this.props;
    return (
      <Container>
        <Navbar bg="light" className="bg-light">
          <Navbar.Brand>
            <Link to={"/"} className="navbar-brand">
              Would You Rather?
            </Link>
          </Navbar.Brand>
          {authedUser && (
            <Fragment>
              <Navbar.Toggle
                onClick={() =>
                  this.setState({
                    navOpen: !this.state.navOpen,
                  })
                }
              />
              <Navbar.Collapse className="justify-content-end">
                <Nav activeKey="/">
                  <Nav.Item>
                    <Nav.Link as={Link} to="/">
                      Home
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link as={Link} to="/leaderboard">
                      Leaderboard
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link as={Link} to="/add">
                      New Question
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link as={Link} to="/Logout">
                      Logout
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <img
                      src={user.avatarURL}
                      className="nav-avatar"
                      alt={`Avatar of ${user.name}`}
                    />
                  </Nav.Item>
                  <Nav.Item className="nav-user">Welcome {user.name}</Nav.Item>
                </Nav>
              </Navbar.Collapse>
            </Fragment>
          )}
        </Navbar>
      </Container>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    user: users[authedUser],
  };
}

export default withRouter(connect(mapStateToProps)(NavBar));
