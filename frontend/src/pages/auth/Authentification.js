import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Login from "./Login";
import Register from "./Register";

const Authentification = (props) => {
  const [user, setUser] = useState("");
  const [redirect, setRedirect] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAuth(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    if (props.user && props.user.name !== user.name) {
      setUser(props.user);
    }
  }, [props.user]);

  const getAuth = (token) => {
    axios
      .get("http://localhost:8000/api/auth", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setUser(result.data.user);
      })
      .catch((error) => {
        logout();
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser("");
    props.removeUser();
  };

  const handleClick = (e) => {
    switch (e.target.id) {
      case "0":
        window.location.href = "/dashboard";
        break;
      case "1":
        setRedirect("my-account");
        break;
      case "2":
        setRedirect("track-my-order");
        break;
      case "3":
        logout();
        break;
      default:
        break;
    }
  };

  if (redirect) {
    return <Navigate to={`/${redirect}`} replace />;
  }

  return user !== "guest" && localStorage.getItem("token") ? (
    <li>
      <Dropdown>
        <Dropdown.Toggle variant="toggle" id="dropdown-basic">
          <i className="fa fa-user-o"></i>
          <span>{user.name}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu onClick={handleClick}>
          {user.role_id !== null && (
            <Dropdown.Item id="0">QUản Lý</Dropdown.Item>
          )}
          <Dropdown.Item id="1">Tài Khoản</Dropdown.Item>
          <Dropdown.Item id="2">Đơn hàng</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item id="3">
            <i id="3" className="fa fa-sign-out" aria-hidden="true"></i>
            Log Out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  ) : (
    <React.Fragment>
      <li>
        <Login />
      </li>
      <li>
        <Register />
      </li>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user_data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeUser: () => dispatch({ type: "USER", value: "guest" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentification);
