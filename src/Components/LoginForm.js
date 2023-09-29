import React, { useContext,useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "./Store/auth-context";


const LoginForm = (props) => {
    const authCtx = useContext(AuthContext);
  const emailInputRef = useRef();
  const passInputRef = useRef();
  const navigate = useNavigate();

  const submitLoginHandle = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPass = passInputRef.current.value;

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCnFkm3QUNpHzskB0kG02tbilsUExeKDno",
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
      const data = await res.json();

      if (res.ok) {
        navigate("/profile", { replace: true });
        authCtx.login(data.idToken, data.email)
        console.log("successfullyLogged in");

      }else {
        throw Error("Authentication Failed");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div >
      <h1 style={{font:"bold"}}>Log In</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter email"
            ref={emailInputRef}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passInputRef}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={submitLoginHandle}>
          Log in
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;