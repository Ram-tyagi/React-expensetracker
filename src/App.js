import NavbarFun from "./Components/Navbar/Navbar";
import { useContext } from "react";
import Signup from "./Components/Signup/Signup";
import {  Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import ProfileComplete from "./Components/Profile/Profile";
import CreateContext from "./Components/Store/create-context";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";

function App() {
  const createcontext = useContext(CreateContext);
  let isLoggedIn = createcontext.isLoggedIn;
  return (
    <div>
            <NavbarFun />
        <Routes>
          
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<ProfileComplete />} />
            </>
          ) : (
            <>
            <Route path="/login" element={<Signup />} />
            <Route path="/forgotpassword" element={<ForgetPassword />} />
          </>
          )}
        </Routes>
    </div>
  );
}

export default App;
