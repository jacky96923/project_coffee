import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ClientLoginPage from "./features/login/ClientLoginPage";
import ClientRegisterPage from "./features/register/ClientRegisterPage";
import ClientMainPage from "./features/main/ClientMainPage";
import { RootState } from "./store";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector<RootState>((state) => state.auth.user);

  return (
    <>
      {user ? <ClientMainPage /> : <ClientLoginPage />}
      {/* <Router>
        <div className="App">
          <Routes>
            <Route path="/client-login" element={<ClientLoginPage />} />
          </Routes>
        </div>
      </Router> */}
    </>
  );
}

export default App;
