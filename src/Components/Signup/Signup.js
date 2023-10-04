import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from "./Signup.module.css";
import Alert from "react-bootstrap/Alert";
import {  useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../ReduxStore/Auth";
function Signup() {
  const [email, setemail] = useState("");
  const [password, setpass] = useState("");
  const [confirmpass, setconfirmpass] = useState("");
  const [err, seterr] = useState(false);
  const [loggin, setLoggin] = useState(false);
  const [Emptyerr, setEmptyerr] = useState(false);
  const [signuperr, setsignuperr] = useState(false);
  const [signupmsg, setsignupmsg] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  
  const dispatch = useDispatch();

  async function signupInFirebase() {
    setloading(true);
    let authlink;
    if (!loggin) {
      authlink =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCvG0m1K0tSlHR6AVIxny788s0PKVOgmKQ";
    } else {
      authlink =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCvG0m1K0tSlHR6AVIxny788s0PKVOgmKQ";
    }
    let response = await fetch(authlink, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setloading(false);
    if (response.ok) {
      let data = await response.json();
      console.log(data);
      setsignuperr(false);
      dispatch(authActions.login({ token: data.idToken, email: data.email }));
      navigate("/");
    } else {
      let data = await response.json();
      console.log(data);
      let errmsg = "Authentication failed";
      if (data && data.error && data.error.message) {
        errmsg = data.error.message;
      }
      setsignuperr(true);
      setsignupmsg(errmsg);
    }
  }
  function formSummit(e) {
    e.preventDefault();
    if (password !== confirmpass) {
      seterr(true);
    } else {
      seterr(false);
    }
    if (password.length < 5 || email.length < 5) {
      setEmptyerr(true);
    } else {
      setEmptyerr(false);
    }
    if (!err && !Emptyerr) {
      signupInFirebase();
    }
  }
  function chagneLogginFun() {
    setLoggin((prev) => {
      return !prev;
    });
  }
  return (
    <div className={classes.signup}>
      {err && <Alert variant="danger">Write password correctly</Alert>}
      {Emptyerr && <Alert variant="danger">Write details correctly</Alert>}
      {signuperr && <Alert variant="danger">{signupmsg}</Alert>}
      <h2 className={classes.heading}>
        {!loggin ? "SignUp Form" : "loggin Form"}
      </h2>
      <div className={classes.flexItems}>
        <Form className={classes.form} onSubmit={formSummit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setpass(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="ConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmpass}
              onChange={(e) => {
                setconfirmpass(e.target.value);
              }}
            />
          </Form.Group>
          {loading ? (
            <p>loading...</p>
          ) : (
            <Button variant="primary" type="submit">
              Submit
            </Button>
          )}
        </Form>
        <div className="mt-4">
          {loggin ? <Link to={"/forgotpassword"}>forgot password</Link> : null}
        </div>
        <div className="mt-4">
          <Button variant="primary" type="submit" onClick={chagneLogginFun}>
            {loggin
              ? "Don't you have account? sign up "
              : "Have an account? Login"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Signup;