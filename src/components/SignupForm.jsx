import { Form, Link } from "react-router";

import classes from "./LoginForm.module.css";

const SignupForm = () => {
  return (
    <>
      <div className={classes.authFormContainer}>
        <Form>
          <h1>Login</h1>
          <div className={classes.container}>
            {/* <label>E-mail</label> */}
            <input
              className={classes.input}
              name="email"
              placeholder="Email"
              type="email"
            />
          </div>
          <div className={classes.container}>
            {/* <label>Password</label> */}
            <input
              className={classes.input}
              name="password"
              placeholder="Password"
              type="password"
            />
          </div>
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
    </>
  );
};

export default SignupForm;
