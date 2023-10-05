import { useState,useEffect } from "react";
import classes from "./Home.module.css";
import axios from "axios";
import { Button,Alert,Form,Dropdown,DropdownButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useDispatch,useSelector } from "react-redux";
import { getallExpense, addExpense, deleteExpense, editExpense } from "../ReduxStore/Expensedata";
import { themeActions } from "../ReduxStore/Theme";
import { CSVLink, CSVDownload } from "react-csv";

const Home = () => {
    const [err, seterr] = useState(false);
    const [spend, setspend] = useState("");
    const [description, setdescription] = useState("");
    const [catogary, setcatogary] = useState("");
    const [premium, setpremium] = useState(false);
    const token = useSelector((state) => state.auth.token);
    const data = useSelector((state) => state.expensedata.data);
    const toggle = useSelector((state) => state.theme.toggle);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function profileComplete() {
      navigate("/profile");
    }
    useEffect(() => {
      dispatch(getallExpense());
    }, [dispatch]);
    async function verifyEmailfun() {
        try {
          const response = await axios.post(
            "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCvG0m1K0tSlHR6AVIxny788s0PKVOgmKQ",
            {
              requestType: "VERIFY_EMAIL",
              idToken: token,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
    
          if (response.status === 200) {
            console.log(response.data);
            seterr(true);
          } else {
            console.error("Error:", response.data);
          }
        } catch (error) {
          console.error("Error:", error);
        }
       
      }
      function FormSummitHandler(e) {
        e.preventDefault();
        dispatch(addExpense({ spend, description, catogary }));
      }
      function itemshowonForm(item) {
        setspend(item.spend);
        setdescription(item.description);
        setcatogary(item.catogary);
      }
        function showdarkTheme() {
    setpremium(true);
    dispatch(themeActions.changeTheme());
  }
  function changetoggle() {
    dispatch(themeActions.changeTheme());
  }

  return (
    <>
         <div id={toggle ? "dark" : ""}>
        {err && <Alert variant="success">User is Varified now</Alert>}
        <div className={classes.itemside}>
          <div className="">
            <p>your profile is incomplete</p>
            <Button variant="primary" type="submit" onClick={profileComplete}>
              Complete Profile
            </Button>
          </div>
          <div className="">
            <h3>Verify Email here </h3>
            <Button variant="primary" type="submit" onClick={verifyEmailfun}>
              Verify Email
            </Button>
            {premium ? (
              <Form className="pt-3">
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="light mode"
                  checked={toggle}
                  onChange={changetoggle}
                />
              </Form>
            ) : null}
          </div>
        </div>
      
      <h2 className={classes.heading}>Welcome to Expense Tracker</h2>

      <div className={classes.items}>
          <Form className={classes.itemForm} onSubmit={FormSummitHandler}>
            <Form.Group className="mb-3" controlId="MoneySpend">
              <Form.Label>Money Spend</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter spend money"
                value={spend}
                onChange={(e) => {
                  setspend(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Enterdescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => {
                  setdescription(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ExpenseCategory">
              <Form.Label>Choose Expense Category</Form.Label>
              <DropdownButton
                id="dropdown-basic-button"
                title={catogary || "Select Category"}
                onSelect={(eventKey) => {
                  setcatogary(eventKey);
                }}
                value={catogary}
              >
                <Dropdown.Item eventKey="Food">Food</Dropdown.Item>
                <Dropdown.Item eventKey="Petrol">Petrol</Dropdown.Item>
                <Dropdown.Item eventKey="Salary">Salary</Dropdown.Item>
              </DropdownButton>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className={classes.summitbtn}
            >
              Submit
            </Button>
          </Form>

          <CSVLink data={data}>
            {premium ? (
              <Button variant="success" id="downloadfile">
                Download all expense
              </Button>
            ) : null}
          </CSVLink>
          <CSVDownload data={data} target="_blank" />

          <h2>Your Expence</h2>
        </div>
        {data.map((item) => (
          <div key={item.id} className="m-2">
            <p>Money: {item.spend}</p>
            <p>Description: {item.description}</p>
            <p>Catogary:{item.catogary}</p>
            {item.spend > 10000 ? (
              <Button variant="warning" className="m-2" onClick={showdarkTheme}>
                Active Premium Button
              </Button>
            ) : null}
            <Button
              variant="danger"
              onClick={() => {
                dispatch(deleteExpense(item.id));
        }}
        className="m-2"
        >
          Delete
        </Button>
        <Button
          variant="success"
          onClick={() => {
            itemshowonForm(item);
      
        }}
        className="m-2"
        >
       
       ItemShowonForm
            </Button>
            <Button
              variant="success"
              onClick={() => {
                let id = item.id;
                dispatch(editExpense({ spend, description, catogary, id }));
              }}
              className="m-2"
            >
              Edit form data
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};
export default Home;