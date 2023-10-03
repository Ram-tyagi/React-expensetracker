import { useEffect,useState } from "react";
import CreateContext from "./create-context";
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
      }, [token]);
    
      const createcontext = {
        token: token,
        isLoggedIn: isLoggedIn,
        name: name,
        email: email,
        photourl: photourl,
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