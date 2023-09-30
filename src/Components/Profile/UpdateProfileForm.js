import React, { useEffect,useRef } from "react";
import { Button, Form } from "react-bootstrap";
import classes from "./UpdateProfileForm.module.css";

const UpdateProfileForm = (props) => {
  const formRef = useRef();
  const nameInputRef = useRef();
  const contactInputRef = useRef();
  const locationInputRef = useRef();
  let emailInputRef = useRef();
  

  console.log(props.user)
  useEffect(()=> {
    if (props.user) {
        nameInputRef.current.value = props.user.displayName;
        emailInputRef.current.value = props.user.email;
      }
  },[props.user])

  const clickUpdateHandler = async (event) => {
      event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredContact = contactInputRef.current.value;
    const enteredLocation = locationInputRef.current.value;


    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCvG0m1K0tSlHR6AVIxny788s0PKVOgmKQ",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: localStorage["user"],
            displayName: enteredName,
            contact: enteredContact,
            location: enteredLocation,
            returnSecureToken: true,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      
      if (res.ok) {
        alert("Profile Updated");
      } else {
        throw new Error("Upadation failed!. Please try again.");
      }
      formRef.current.reset();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <section className={classes.updateForm}>
      <h1>Update profile</h1>
      <Form ref={formRef}>
      <Form.Group className={classes["mb-3"]}>
          <Form.Label className={classes.label}>Email</Form.Label>
          <Form.Control placeholder="Email" ref={emailInputRef} />
        </Form.Group>
        <Form.Group className={classes["mb-3"]}>
          <Form.Label className={classes.label}>Full Name:</Form.Label>
          <Form.Control placeholder="Full Name" ref={nameInputRef} />
        </Form.Group>
        <Form.Group className={classes["mb-3"]}>
          <Form.Label className={classes.label}>Contact No.:</Form.Label>
          <Form.Control placeholder="Contact No." ref={contactInputRef} />
        </Form.Group>
        <Form.Group className={classes["mb-3"]}>
          <Form.Label className={classes.label}>Location: </Form.Label>
          <Form.Control placeholder="Location" ref={locationInputRef} />
        </Form.Group>
        <Button type="submit" onClick={clickUpdateHandler}>
          Update
        </Button>
      </Form>
    </section>
  );
};

export default UpdateProfileForm;