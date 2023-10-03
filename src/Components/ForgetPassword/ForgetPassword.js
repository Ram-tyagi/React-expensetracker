import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from "./ForgetPassword.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
function ForgetPassword() {
  const [mail, setmail] = useState("");
  const [loader, setloader] = useState(false);
  async function ForgetPasswordFun() {
    setloader(true);
    let response = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCvG0m1K0tSlHR6AVIxny788s0PKVOgmKQ",
      {
        requestType: "PASSWORD_RESET",
        email: mail,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      console.log(response.data);
    } else {
      console.log(response.data);
    }
    setloader(false);
  }
  return (
    <div className={classes.section}>
      <h2 className={classes.heading}>
        Enter the email from that you are registered{" "}
      </h2>
      <div className={classes.form}>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={mail}
              onChange={(e) => {
                setmail(e.target.value);
              }}
            />
          </Form.Group>

          {loader ? (
            <p>loading data...</p>
          ) : (
            <Button variant="primary" type="submit" onClick={ForgetPasswordFun}>
              Send Link
            </Button>
          )}
        </Form>
      </div>
      <Link to={"/login"}>Already a user login? Login</Link>
    </div>
  );
}

export default ForgetPassword;