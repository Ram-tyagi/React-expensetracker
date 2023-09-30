import React, { Fragment, useState,useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import AuthContext from "../Store/auth-context";
import { Button } from "react-bootstrap";


import classes from "./Profile.module.css";
import UpdateProfileForm from "./UpdateProfileForm";

const Profile = (props) => {
  const [updateVisible, setUpdateVisible] = useState(false);
  const authCtx = useContext(AuthContext);
  const [userData, setUserData] = useState(null)
  const navigate = useNavigate()

  const updateVisibleHandler = async() => {
    setUpdateVisible(true);

    try {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCvG0m1K0tSlHR6AVIxny788s0PKVOgmKQ",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idToken: authCtx.token,
            }),
          }
        );
        const data = await res.json();
        setUserData(data.users[0]);
  
      } catch (error) {
        alert(error);
      }
    };
    const clickLogoutHandler = () => {
        authCtx.logout();
        navigate('/',{replace: true});
    
      };
    
  
  return (
    <Fragment>
    <section className={classes.proCon}>
      <div className={classes.header}>
        <div className={classes.headerDetail}>
          <p>Welcome to Expense tracker</p>
          <span className={classes.incomplete}>
            {!updateVisible ? (
              "Your Profile is incomplete. "
            ) : (
              <React.Fragment>
                Your profile <strong>x%</strong> completed.
              </React.Fragment>
            )}
            <Link onClick={updateVisibleHandler}>Complete now</Link>
          </span>
        </div>
        <div>
          <Button variant="danger" onClick={clickLogoutHandler}>Log out</Button>
        </div>
      </div>
    </section>
    {updateVisible && <UpdateProfileForm user={userData} />}
  </Fragment>
  );
};

export default Profile;