import React from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import BusinessLoginPage from "./BusinessLoginPage";
import BusinessRegisterPage from "./BusinessRegisterPage";
import BusinessLocationPage from "./BusinessLocationPage";
import LoginokPage from "./LoginokPage"; // Make sure this import is correct
import { BusinessChooseShopOpenTime } from "./BusinessChooseShopOpenTime";
import BusinessWelcome from "./BusinessWelcomePage"; // Corrected import
import { RootState } from "./store";
import { useSelector } from "react-redux";
import MenuPreview from "./Pages/MenuPreview/MenuPreview";

function App() {
  const user = useSelector<RootState>((state) => state.auth.user);

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/BusinessLogin" />} />
          <Route
            path="/BusinessLogin"
            element={
              user ? (
                <Navigate replace to="/login-success" />
              ) : (
                <BusinessLoginPage />
              )
            }
          />
          <Route path="/login-success" element={<LoginokPage />} />{" "}
          <Route path="/MenuPreview" element={<MenuPreview />} />
          {/* Define the route for login success */}
          <Route path="/BusinessRegister" element={<BusinessRegisterPage />} />
          <Route path="/BusinessLocation" element={<BusinessLocationPage />} />
          <Route
            path="/ShopOpenTime"
            element={<BusinessChooseShopOpenTime />}
          />
          <Route path="/BusinessWelcome" element={<BusinessWelcome />} />{" "}
          {/* Corrected route path */}
        </Routes>
      </div>
    </>
  );
}

export default App;
