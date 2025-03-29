import { useEffect, useRef, useState } from "react";
import { Form, Link, useActionData, useNavigate } from "react-router";
import { isEmpty, isValidEmail, isUnderLimit } from "./../validation";

import classes from "./LoginForm.module.css";

const SignupForm = () => {
  const [resData, setResData] = useState(null);
  const [timer, setTimer] = useState(5);
  const nameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const errors = useActionData();

  let time = 5000;

  useEffect(() => {
    if (token) {
      navigate("/");
    }

    if (!Array.isArray(errors)) {
      setResData(errors);
    }

    if (resData?.status === "success") {
      nameInput.current.value = "";
      emailInput.current.value = "";
      passwordInput.current.value = "";
      setTimeout(() => {
        navigate("/login");
      }, time);
      setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
  }, [token, errors, resData]);

  return (
    <>
      <div className={classes.authFormContainer}>
        <Form method="POST">
          <h1>Signup</h1>
          {resData?.status === "success" && (
            <>
              <p className="success">
                Please login to registered email Address
              </p>
              <p className="success">redirecting to login page in {timer}s</p>
            </>
          )}
          <div className={classes.container}>
            <input
              ref={nameInput}
              className={classes.input}
              name="name"
              placeholder="Name"
              type="text"
            />
          </div>
          <div className={classes.container}>
            <input
              ref={emailInput}
              className={classes.input}
              name="email"
              placeholder="Email"
              type="email"
            />
          </div>
          <div className={classes.container}>
            <input
              ref={passwordInput}
              className={classes.input}
              name="password"
              placeholder="Password"
              type="password"
            />
          </div>
          {Array.isArray(errors) ? (
            <ul className="errors">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          ) : (
            <>
              <p className="error">{resData?.message}</p>
              <p className="success">{resData?.status}</p>
            </>
          )}
          <div className={classes.btnContainer}>
            <button className={classes.btnLogin}>Signup</button>
            <Link to="/login">
              <button type="button" className={classes.btnSignup}>
                Login
              </button>
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default SignupForm;

export const SignupAction = async (request) => {
  const data = await request.formData();
  const method = request.method;
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const userData = {
    name: data.get("name"),
    email: data.get("email"),
    password: data.get("password"),
  };

  let errors = [];

  if (isEmpty(userData.name)) {
    errors.push("You must provide a name");
  }

  if (isUnderLimit(5, userData.name)) {
    errors.push("Name must be at least 5 characters");
  }

  if (isEmpty(userData.email)) {
    errors.push("You must provide email address");
  }

  if (!isValidEmail(userData.email)) {
    errors.push("Please enter a valid email address");
  }

  if (isEmpty(userData.password)) {
    errors.push("You must provide a password");
  }

  if (isUnderLimit(8, userData.password)) {
    errors.push("Password must be at least 8 characters / numbers only");
  }

  if (errors.length > 0) {
    return errors;
  }

  const response = await fetch(`${baseUrl}/auth/register`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const resData = await response.json();

  if (resData.message) {
    return resData;
  }

  if (resData.status === "success") {
    return resData;
  }
};
