import React from "react";
import "./Rank.css";

const Rank = ({ user }) => {
  return (
    
    <div>
      <div className="white f3">{`${user.name}, you have submited `}</div>
      <div className="white f1">{`${user.entries} images`}</div>
    </div>
  );
};

export default Rank;
