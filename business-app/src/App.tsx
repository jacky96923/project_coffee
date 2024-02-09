import "./App.css";

import { Route, Routes, Navigate } from "react-router-dom";
import BusinessLoginPage from "./BusinessLoginPage";
import BusinessRegisterPage from "./BusinessRegisterPage";
import BusinessLocation from "./BusinessLocationPage";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/businessLogin" />} />
          <Route path="/businessLogin" element={<BusinessLoginPage />} />
          <Route path="/business-register" element={<BusinessRegisterPage />} />
          <Route path="/business-location" element={<BusinessLocation />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
