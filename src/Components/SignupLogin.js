import React, { useState } from "react";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import classes from "./SignupLogin.module.css";

const SignupLogin = (props) => {
  const [isLogin, setIsLogin] = useState(true);

  const switchHandler = (event) => {
    setIsLogin(false);
  };

  return (
    <div>
      <div className={classes.auth}>
        {!isLogin && <SignupForm />}
        {isLogin && <LoginForm />}
      </div>
      <div className={classes.switchCon}>
        <p>
          Don't have an account?<button onClick={switchHandler}>Sign Up</button>
        </p>
      </div>
    </div>
  );
};

export default SignupLogin;