import { Route, Routes } from "react-router-dom";

import Dummy from "./Components/Dummy/Welcome";
import SignupLogin from "./Components/SignupLogin";
function App() {
  return (
    <div>
    <Routes>
        <Route path="/" element={<SignupLogin />} />
        <Route path="/dummy" element={<Dummy />} />
      </Routes>
    </div>
  );
}

export default App;
