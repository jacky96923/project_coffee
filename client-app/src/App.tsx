import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ClientLoginPage from "./ClientLoginPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          //clinet
          <Route path="/client-login" element={<ClientLoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
