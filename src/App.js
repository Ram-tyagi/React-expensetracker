import NavbarFun from "./Components/Navbar/Navbar";

import Signup from "./Components/Signup/Signup";
import {  Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import ProfileComplete from "./Components/Profile/Profile";

import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

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
