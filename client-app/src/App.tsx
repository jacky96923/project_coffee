import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ClientLoginPage from "./features/login/ClientLoginPage";
import ClientRegisterPage from "./features/register/ClientRegisterPage";
import ClientMainPage from "./features/main/ClientMainPage";

function App() {
  return (
    <>
      <ClientMainPage />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/client-login" element={<ClientLoginPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
