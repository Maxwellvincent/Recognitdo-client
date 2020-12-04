import React from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "./Navigation.css";

const Nav = ({ onRouteChange, isLogin }) => {
  const history = useHistory();

  if (isLogin) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link to="/login">
          <p
            className="f3 link dim black underline pa3 pointer"
            onClick={() => {
              toast.success("Logged Successfully!");
              // onRouteChange("login");
            }}
          >
            Log Out
          </p>
        </Link>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link to="/login">
          <p
            className="f3 link dim black underline pa3 pointer"
            onClick={history.push("/login")}
          >
            Login
          </p>
        </Link>
        <Link to="/register">
          <p className="f3 link dim black underline pa3 pointer">Register</p>
        </Link>
      </nav>
    );
  }
};

export default Nav;
