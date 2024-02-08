import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BussinessLoginPage from "./BussinessLoginPage";
import ShopRegisterPage from "./ShopRegisterPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/business-login" element={<BussinessLoginPage />} />
        <Route path="/shop-register" element={<ShopRegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
