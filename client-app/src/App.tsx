import React from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ClientLoginPage from "./Pages/login/LoginPage";
import ClientRegisterPage from "./Pages/register/RegisterPage";
import ClientMainPage from "./Pages/main/MainPage";
import { CommentPage } from "./Pages/Comments/CommentPage";

import { RootState } from "./store";
import { useSelector } from "react-redux";
import ShopSelection from "./Pages/shopSelection/ShopSelection";
import ProductSelection from "./Pages/productSelection/ProductSelection";

function App() {
  const user = useSelector<RootState>((state) => state.auth.user);
  return (
    <>
      <Router>
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
            <Route
              path="/productSelection/:shopId"
              element={<ProductSelectionWrapper />}
            />

            <Route path="/CommentPage" element={<CommentPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

function ProductSelectionWrapper({ match }: any) {
  const { shopId } = match.params;
  return <ProductSelection shopId={parseInt(shopId)} />;
}

export default App;
