import "./App.css";

import { Route, Routes, Navigate } from "react-router-dom";
import BusinessLoginPage from "./BusinessLoginPage";
import BusinessRegisterPage from "./BusinessRegisterPage";
import BusinessLocation from "./BusinessLocationPage";
import LoginokPage from "./LoginokPage";

import { RootState } from "./store";
import { useSelector } from "react-redux";
function App() {
  const user = useSelector<RootState>((state) => state.auth.user);
  return (
    
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/businessLogin" />} />
          <Route path="/businessLogin" element={user? <LoginokPage/>: <BusinessLoginPage />}></Route>
          <Route path="/business-register" element={<BusinessRegisterPage />} />
          <Route path="/business-location" element={<BusinessLocation />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
