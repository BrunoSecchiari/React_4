import React, { useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  if (action.type === "REGISTER_EMAIL") {
    return { value: action.value, isValid: action.value.includes("@") };
  } else if (action.type === "VALIDATE_EMAIL") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "REGISTER_PASSWORD") {
    return { value: action.value, isValid: action.value.trim().length > 6 };
  } else if (action.type === "VALIDATE_PASSWORD") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  const [currentEmail, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [currentPassword, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const { isValid: emailIsValid } = currentEmail;
  const { isValid: passwordIsValid } = currentPassword;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Validation");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log("Clean Up");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "REGISTER_EMAIL", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "REGISTER_PASSWORD", value: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "VALIDATE_EMAIL" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "VALIDATE_PASSWORD" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(currentEmail.value, currentPassword.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            currentEmail.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={currentEmail.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            currentPassword.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={currentPassword.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
