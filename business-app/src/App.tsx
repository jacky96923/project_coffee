import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BussinessLoginPage from "./BusinessLoginPage";
import BusinessRegisterPage from "./BusinessRegisterPage";
import BusinessLocation from "./BusinessLocationPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/business-login" element={<BussinessLoginPage />} />
        <Route path="/business-register" element={<BusinessRegisterPage />} />
        <Route path="/business-location" element={<BusinessLocation />} />
      </Routes>
    </div>
  );
}

export default App;
