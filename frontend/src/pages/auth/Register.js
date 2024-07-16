import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function Register(props) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorKeys, setErrorKeys] = useState([]);
  const [error, setError] = useState([]);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [googleLoading, setGoogleLoading] = useState(false); // Add separate loading state for Google
  const [githubLoading, setGithubLoading] = useState(false);
  // Handle GitHub login
  const handleGitHubLogin = () => {
    setGithubLoading(true);
    axios
      .get("http://localhost:8000/api/login/github?state=github")
      .then((response) => {
        window.location.href = response.data.url;
      })
      .catch((error) => {
        console.error("GitHub login error:", error);
        setGithubLoading(false);
      });
  };
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    if (code) {
      githubLoading == true
        ? navigate("/login")
        : axios
            .get(`http://localhost:8000/api/login/github/callback?code=${code}`)
            .then((response) => {
              const { user, token } = response.data;
              localStorage.setItem("token", token);
              props.addUser(user);
              navigate("/"); // Redirect to home or authenticated route
            })
            .catch((error) => {
              console.error("GitHub callback error:", error);
            });
    }
  }, [location.search, navigate]);

  // Handle Google login
  const handleGoogleLogin = () => {
    setGoogleLoading(true); // Set Google loading state to true
    axios
      .get("http://localhost:8000/api/login/google/url?state=google")
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

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    axios
      .post("http://localhost:8000/api/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirm,
      })
      .then((result) => {
        localStorage.setItem("token", result.data.token);
        props.addUser(result.data.user);
        setLoading(false);
        handleClose();
      })
      .catch((err) => {
        setErrorKeys(Object.keys(err.response.data));
        setError(err.response.data);
        setLoading(false);
      });
  }

  // Handle input change
  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "password_confirmation") setPasswordConfirm(value);
  }

  return (
    <React.Fragment>
      <Button onClick={handleShow} bsPrefix="auth">
        <i className="fa fa-user-o"></i> Register
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="auth-title">User Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="auth" onSubmit={handleSubmit}>
            {error &&
              errorKeys.map((key) => (
                <div className="form-alert" key={key}>
                  <Alert variant="danger">
                    <i className="fa fa-exclamation-triangle"></i>
                    {error[key]}
                  </Alert>
                </div>
              ))}
            <div className="form-group">
              <input
                type="text"
                required
                className="form-control auth-input"
                name="name"
                placeholder="Enter Name"
                onChange={handleChange}
              />
              <i className="fa fa-user"></i>
            </div>
            <div className="form-group">
              <input
                type="email"
                required
                className="form-control auth-input"
                name="email"
                placeholder="Enter Email"
                onChange={handleChange}
              />
              <i className="fa fa-envelope"></i>
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
            <div className="form-group">
              <input
                type="password"
                required
                className="form-control auth-input"
                name="password_confirmation"
                placeholder="Enter Password Again"
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
                  <span>Registering...</span>
                </div>
              ) : (
                <span>Register</span>
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
            Sign up with GitHub
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
            Sign up with Google
          </Button>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user) => dispatch({ type: "USER", value: user }),
  };
};

export default connect(null, mapDispatchToProps)(Register);
