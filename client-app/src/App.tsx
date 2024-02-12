import React from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ClientLoginPage from "./features/login/LoginPage";
import ClientRegisterPage from "./features/register/RegisterPage";
import ClientMainPage from "./features/main/MainPage";
import { CommentPage } from "./features/Comments/CommentPage";

import { RootState } from "./store";
import { useSelector } from "react-redux";
import ShopSelection from "./features/shopSelection/ShopSelection";

function App() {
  const user = useSelector<RootState>((state) => state.auth.user);
  return (
    <>
      {/* <ClientMainPage /> */}
      <Router>
        {/* <div className="App">
          {user ? <ClientMainPage /> : <ClientLoginPage />}
        </div> */}

        <div className="App">
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/client-login"></Navigate>}
            />
            <Route
              path="/client-login"
              element={user ? <ClientMainPage /> : <ClientLoginPage />}
            />
            <Route
              path="/client-register"
              element={user ? <ClientMainPage /> : <ClientRegisterPage />}
            />
            <Route path="/shopSelection" element={<ShopSelection />} />
            <Route path="/CommentPage" element={<CommentPage />} />
          
          </Routes>
   
        </div>
      </Router>
    </>
  );
}

export default App;
