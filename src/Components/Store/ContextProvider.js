import { useEffect,useState } from "react";
import CreateContext from "./create-context";
import axios from "axios";
const ContextProvider = (props) => {
    function getItemsFromLocalstorage() {
        let items = localStorage.getItem("token");
        if (!items) return;
        else {
          items = JSON.parse(items);
          return items;
        }
      }
      function getToken() {
        let itemToken = getItemsFromLocalstorage();
        if (!itemToken) {
          return "";
        } else {
          return itemToken.token;
        }
      }
      function getEmail() {
        let itemToken = getItemsFromLocalstorage();
        if (!itemToken) {
          return "";
        } else {
          return itemToken.email;
        }
      }
      const [token, setToken] = useState(getToken);
      const [email, setemail] = useState(getEmail);
      const [name, setname] = useState("");
      const [photourl, setphotourl] = useState("");
      const [expensedata, setexpensedata] = useState([]);
      const isLoggedIn = !!token;
    
      function setTokenHandler(tok, mail) {
        setToken(tok);
        setemail(mail);
        const obj = {
          token: tok,
          email: mail,
        };
        localStorage.setItem("token", JSON.stringify(obj));
      }
      function setTokenoutHandler() {
        localStorage.removeItem("token");
        setToken(null);
      }
      useEffect(() => {
        async function getProfileApi() {
          try {
            const response = await fetch(
              "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCvG0m1K0tSlHR6AVIxny788s0PKVOgmKQ",
              {
                method: "POST",
                body: JSON.stringify({ idToken: token }),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
    
            if (response.ok) {
              const data = await response.json();
              setname(data.users[0].displayName);
              setphotourl(data.users[0].photoUrl);
            } else {
              const errorData = await response.json();
              console.log("Error response:", errorData);
            }
          } catch (error) {
            console.error("An error occurred:", error);
          }
        }
    
        if (isLoggedIn) {
          getProfileApi();
        }
    }, [isLoggedIn, token]);
    

    useEffect(() => {
      async function getExpensedata() {
        let response = await axios.get(
          "https://expensetrackerdatabase-581fe-default-rtdb.firebaseio.com/expense.json"
        );
        if (response.status === 200) {
          response = response.data;
          let expensearr = [];
          for (const key in response) {
            expensearr.push({
              id: key,
              catogary: response[key].catogary,
              description: response[key].description,
              spend: response[key].spend,
            });
          }
          setexpensedata(expensearr);
        } else {
          console.log("err", response);
        }
      }
      getExpensedata();
    }, []);
  
    async function addExpnseHandler(spend, description, catogary) {
      let response = await axios.post(
        "https://expensetrackerdatabase-581fe-default-rtdb.firebaseio.com/expense.json",
        {
          spend,
          description,
          catogary,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        let dataArr = { catogary, description, spend, id: response.data.name };
        setexpensedata((prev) => {
          return [...prev, dataArr];
        });
      } else {
        console.log("Error:" + response.data);
      }
    }
    async function deleteExpenseHandler(id) {
        let copyexpensedata = [...expensedata];
        copyexpensedata = copyexpensedata.filter((val) => {
          return val.id !== id;
        });
        setexpensedata(copyexpensedata);
        let response = await axios.delete(
            `https://expensetrackerdatabase-581fe-default-rtdb.firebaseio.com/expense/${id}.json`
          );
          if (response.status === 200) {
            alert("successfully deleted");
          } else {
            console.log("Error", response.data);
          }
        }
      
        async function editExpenseHandler(spend, description, catogary, id) {
          let copyexpensedata = [...expensedata];
          let expenseIndex = copyexpensedata.findIndex((val) => {
            return val.id === id;
          });
      
          copyexpensedata[expenseIndex].spend = spend;
          copyexpensedata[expenseIndex].description = description;
          copyexpensedata[expenseIndex].catogary = catogary;
          setexpensedata(copyexpensedata);
      
          let response = await axios.put(
            `https://expensetrackerdatabase-581fe-default-rtdb.firebaseio.com/expense/${id}.json`,
            {
              spend,
              description,
              catogary,
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
            console.log("Error", response.data);
          }
        }
    
      const createcontext = {
        token: token,
        isLoggedIn: isLoggedIn,
        name: name,
        email: email,
        photourl: photourl,
        expensedata: expensedata,
        addExpnse: addExpnseHandler,
        deleteExpense: deleteExpenseHandler,
        editExpense: editExpenseHandler,
        setToken: setTokenHandler,
        setTokenout: setTokenoutHandler,
      }
  return (
    <CreateContext.Provider value={createcontext}>
      {props.children}
    </CreateContext.Provider>
  );
};

export default ContextProvider;