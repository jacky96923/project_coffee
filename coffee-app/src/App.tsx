import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ClientLoginPage from "./ClientLoginPage";
import BussinessLoginPage from "./BussinessLoginPage";
import ShopRegisterPage from "./ShopRegisterPage";
import ClientRegisterPage from "./ClientRegisterPage";
function App() {
  return (
    // <Router>
    <div className="App">
      <ClientRegisterPage />
      {/* <Routes> */}
      {/* //clinet */}
      {/* <Route path="/" element={<ClientLoginPage />} /> */}
      {/* <Route path="/client-login" element={<ClientLoginPage />} /> */}
      {/* //business */}
      {/* <Route path="/business-login" element={<BussinessLoginPage />} />
          <Route path="/shop-register" element={<ShopRegisterPage />} /> */}
      {/* </Routes> */}
    </div>
    // </Router>
  );
}

export default App;
