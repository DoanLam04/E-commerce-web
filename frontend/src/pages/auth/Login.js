import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function Login(props) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [googleLoading, setGoogleLoading] = useState(false); // Add separate loading state for Google
  const [githubLoading, setGithubLoading] = useState(false); // Separate loading state for GitHub

  const handleClose = () => {
    setShow(false);
    props.hideLogin();
  };

  const handleShow = () => {
    setShow(true);
  };

  // Handle regular login
  const handleRegularLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:8000/api/login", {
        email: email,
        password: password,
      })
      .then((result) => {
        localStorage.setItem("token", result.data.token);
        props.addUser(result.data.user);
        setLoading(false);
        handleClose(); // Close the modal after successful login
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  };

  // Handle GitHub login
  const handleGitHubLogin = () => {
    setGithubLoading(true);
    axios
      .get("http://localhost:8000/api/login/github")
      .then((response) => {
        window.location.href = response.data.url;
      })
      .catch((error) => {
        console.error("GitHub login error:", error);
        setGithubLoading(false);
      });
  };

  // Handle Google login
  const handleGoogleLogin = () => {
    setGoogleLoading(true); // Set Google loading state to true
    axios
      .get("http://localhost:8000/api/login/google/url")
      .then((response) => {
        window.location.href = response.data.url;
      })
      .catch((error) => {
        console.error("Google login error:", error);
        setGoogleLoading(false); // Set Google loading state to false on error
      });
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    if (code) {
      navigate("/login");
      axios
        .post(
          `http://localhost:8000/api/login/google/callback`,
          { code },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          const { user, token } = response.data;
          localStorage.setItem("token", token);
          props.addUser(user);
          navigate("/"); // Redirect to home or authenticated route
        })
        .catch((error) => {
          console.error("Google callback error:", error);
        });
    }
  }, [location.search, navigate, props]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  return (
    <React.Fragment>
      <Button onClick={handleShow} bsPrefix="auth">
        <i className="fa fa-sign-in"></i> Login
      </Button>
      <Modal show={show || props.showLogin} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="auth-title">User Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="auth" onSubmit={handleRegularLogin}>
            {error && (
              <div className="form-alert">
                <Alert variant="danger">
                  <i className="fa fa-exclamation-triangle"></i> Invalid
                  credentials!
                </Alert>
              </div>
            )}
            <div className="form-group">
              <input
                type="email"
                required
                className="form-control auth-input"
                name="email"
                placeholder="Enter Email"
                onChange={handleChange}
              />
              <i className="fa fa-user"></i>
            </div>
            <div className="form-group">
              <input
                type="password"
                required
                className="form-control auth-input"
                name="password"
                placeholder="Enter Password"
                onChange={handleChange}
              />
              <i className="fa fa-lock"></i>
            </div>
            <button type="submit" className="submit btn btn-danger">
              {loading ? (
                <div className="align-middle">
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span>Logging in...</span>
                </div>
              ) : (
                <span>Login</span>
              )}
            </button>
          </form>
          <div className="separator" style={{ textAlign: "center" }}>
            <span>--------or---------</span>
          </div>
          <Button
            className="github-auth"
            variant="dark"
            onClick={handleGitHubLogin}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "76%",
              marginTop: "5px",
              backgroundColor: "#000",
              borderColor: "#000",
              color: "#fff",
              textShadow: "none",
              cursor: "pointer",
              marginLeft: "58px",
              marginBottom: "5px",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#fff";
              e.target.style.color = "#000";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#000";
              e.target.style.color = "#fff";
            }}
          >
            {githubLoading ? (
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              <i className="fab fa-github" style={{ marginRight: "10px" }}></i>
            )}
            Đăng nhập với Github
          </Button>
          <Button
            className="google-auth"
            variant="dark"
            onClick={handleGoogleLogin}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "76%",
              marginTop: "5px",
              backgroundColor: "#CC0033",
              borderColor: "#000",
              color: "#fff",
              textShadow: "none",
              cursor: "pointer",
              marginLeft: "58px",
              marginBottom: "5px",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#fff";
              e.target.style.color = "#CC0033";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#CC0033";
              e.target.style.color = "#fff";
            }}
          >
            {googleLoading ? (
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              <i className="fab fa-google" style={{ marginRight: "10px" }}></i>
            )}
            Đăng nhập với Google
          </Button>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    showLogin: state.show_login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user) => dispatch({ type: "USER", value: user }),
    hideLogin: () => dispatch({ type: "LOGIN_CONTROL", value: false }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
