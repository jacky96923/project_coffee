import React from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import BusinessLoginPage from "./Pages/Login/LoginPage";
import BusinessRegisterPage from "./RegisterPage";
import BusinessLocationPage from "./LocationPage";
import LoginokPage from "./Pages/Login/LoginokPage"; // Make sure this import is correct

import BusinessWelcome from "./WelcomePage"; // Corrected import
import { RootState } from "./store";
import { useSelector } from "react-redux";
import MenuPreview from "./Pages/MenuPreview/MenuPreview";
import AllItem from "./Pages/AllItem/AllItem";
import PromotionInfo from "./Pages/PromotionInfo/PromotionInfo";
import AddItem from "./Pages/AddItem/AddItem";
import { BusinessChooseShopOpenTime } from "./ShopOpenTime";
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
          <Route path="/AllItem" element={<AllItem />} />
          <Route path="/AddItem" element={<AddItem />} />
          <Route path="/PromotionInfo" element={<PromotionInfo />} />
          {/* Corrected route path */}
        </Routes>
      </div>
    </>
  );
}

export default App;
