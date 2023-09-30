import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import classes from "./SignupForm.module.css";

const SignupForm = (props) => {
  const formRef = useRef();
  const emailInputRef = useRef();
  const passInputRef = useRef();
  const conPassInputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPass = passInputRef.current.value;
    const enteredConPass = conPassInputRef.current.value;

    if (enteredPass !== enteredConPass) {
      alert("Password not matched with Confirm password.");
    }
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCvG0m1K0tSlHR6AVIxny788s0PKVOgmKQ",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPass,
            returnSecureToken: true,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      console.log("Successfully signed up");
      alert("Successfully signed up")
      if (!res.ok) {
        throw Error("Authentication Failed");
      }
      formRef.current.reset();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={classes.signup}>
      <h1>Sign Up</h1>
      <Form ref={formRef}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            ref={emailInputRef}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passInputRef}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            ref={conPassInputRef}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={submitHandler}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SignupForm;