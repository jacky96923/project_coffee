import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ClientLoginPage from "./ClientLoginPage";
import BussinessLoginPage from "./BussinessLoginPage";
import ShopRegisterPage from "./ShopRegisterPage";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          //clinet
          <Route path="/client-login" element={<ClientLoginPage />} />
          //business
          <Route path="/business-login" element={<BussinessLoginPage />} />
          <Route path="/shop-register" element={<ShopRegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
