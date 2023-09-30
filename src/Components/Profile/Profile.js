import React, {  useState,useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../Store/auth-context";


import classes from "./Profile.module.css";
import UpdateProfileForm from "./UpdateProfileForm";

const Profile = (props) => {
  const [updateVisible, setUpdateVisible] = useState(false);
  const authCtx = useContext(AuthContext);
  const [userData, setUserData] = useState(null)
  

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
   
  
  return (
    <div className={classes.proCon}>
      <div className={classes.header}>
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
      {updateVisible && <UpdateProfileForm user={userData}/>}
    </div>
  );
};

export default Profile;