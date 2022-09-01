import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";

import classes from "./Navigation.module.css";

const Navigation = () => {
  const ctx = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Section 1</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Section 2</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
