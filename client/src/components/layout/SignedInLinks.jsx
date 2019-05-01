import React from "react";
import { NavLink } from "react-router-dom";

const SignedInLinks = ({ logout, userName }) => {
  return (
    <ul className="right">
      <li>
        <a href="/" onClick={logout}>
          Logout
        </a>
      </li>
      <li>{userName}</li>
    </ul>
  );
};

export default SignedInLinks;
