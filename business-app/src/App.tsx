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
import { BusinessChooseShopOpenTime } from "./ShopOpenTime";
import AddItem from "./Pages/AddItem/AddItem";
import { AuthGuard } from "./AuthGuard";
function App() {
  const shop = useSelector<RootState>((state) => state.auth.shop);

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/businessLogin" />} />
          <Route path="/businessRegister" element={<BusinessRegisterPage />} />
          <Route path="/businessLocation" element={<BusinessLocationPage />} />
          <Route path="/businessWelcome" element={<BusinessWelcome />} />{" "}
          <Route path="/businessLogin" element={
              shop? (
                <Navigate replace to="/login-success" />
              ) : (
                <BusinessLoginPage />
              )
            }
          />
          <Route path="/login-success" element={<LoginokPage />} />{" "}
          <Route element={<AuthGuard/>}>
            <Route path="/MenuPreview" element={<MenuPreview />} />
            <Route
              path="/ShopOpenTime"
              element={<BusinessChooseShopOpenTime />}
            />
            <Route path="/AllItem" element={<AllItem />} />
            <Route path="/AddItem" element={<AddItem />} />
            <Route path="/PromotionInfo" element={<PromotionInfo />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
