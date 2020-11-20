import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

const Button = (props) => {
  return (
    <div>
      <p className="f6 link dim ph3 pv2 mb2 dib white bg-light-purple">
        <Link to={`/${props.route}`} style={{ color: "white" }}>
          {props.route}
        </Link>
      </p>
    </div>
  );
};

export default Button;
