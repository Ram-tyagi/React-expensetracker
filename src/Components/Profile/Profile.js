import React, {  useState } from "react";
import { Link } from "react-router-dom";


import classes from "./Profile.module.css";
import UpdateProfileForm from "./UpdateProfileForm";

const Profile = (props) => {
  const [updateVisible, setUpdateVisible] = useState(false);
  

  const updateVisibleHandler = () => {
    setUpdateVisible(true);
   
  }
  return (
    <div className={classes.proCon}>
      <div className={classes.header}>
        <p>Welcome to Expense tracker</p>
        <span className={classes.incomplete}>
          {!updateVisible
            ? "Your Profile is incomplete. "
            : <React.Fragment>Your profile <strong>x%</strong> completed.</React.Fragment>}
          <Link onClick={updateVisibleHandler}>Complete now</Link>
        </span>

      </div>
      {updateVisible && <UpdateProfileForm />}
    </div>
  );
};

export default Profile;