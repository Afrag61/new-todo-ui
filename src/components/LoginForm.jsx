import { Form, Link, redirect, useActionData, useNavigate } from "react-router";

import classes from "./LoginForm.module.css";
import { isEmpty, isUnderLimit, isValidEmail } from "./../validation";
import { useEffect } from "react";

const LoginForm = () => {
  const errors = useActionData();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className={classes.authFormContainer}>
      <Form method="POST">
        <h1>Login</h1>
        <div className={classes.container}>
          <input
            className={classes.input}
            name="email"
            placeholder="Email"
            type="email"
          />
        </div>
        <div className={classes.container}>
          <input
            className={classes.input}
            name="password"
            placeholder="Password"
            type="password"
          />
        </div>
        {errors && (
          <ul className="errors">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <div className={classes.btnContainer}>
          <button className={classes.btnLogin}>Login</button>
          <Link to="/signup">
            <button type="button" className={classes.btnSignup}>
              Signup
            </button>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;

export const loginAction = async (request) => {
  const data = await request.formData();
  const method = request.method;
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const userData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  let vErrors = [];

  if (isEmpty(userData.email)) {
    vErrors.push("You must provide email address");
  }

  if (!isValidEmail(userData.email)) {
    vErrors.push("Please enter a valid email address");
  }

  if (isEmpty(userData.password)) {
    vErrors.push("You must provide a valid password");
  }

  if (isUnderLimit(8, userData.password)) {
    vErrors.push("password must be at least 8 characters / numbers only");
  }

  if (vErrors.length > 0) {
    return vErrors;
  }

  const response = await fetch(`${baseUrl}/auth/login`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const { status, errors, token } = await response.json();

  if (errors) {
    vErrors.push("Wrong email or password");
    return vErrors;
  } else {
    localStorage.setItem("token", token);
    return redirect("/");
  }
};
