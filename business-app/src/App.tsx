import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import BusinessLoginPage from "./Pages/Login/LoginPage";
import BusinessRegisterPage from "./RegisterPage";
import BusinessLocationPage from "./LocationPage";
import BusinessWelcome from "./WelcomePage";
import BusinessCommentPage from "./BusinessComment"; // Import the BusinessCommentPage component
import MainPage from "./Pages/Login/MainPage";
import MenuPreview from "./Pages/MenuPreview/MenuPreview";
import AllItem from "./Pages/AllItem/AllItem";
import PromotionInfo from "./Pages/PromotionInfo/PromotionInfo";
import { BusinessChooseShopOpenTime } from "./ShopOpenTime";
import MainAddItem from "./Pages/AddItem/MainAddItem";
import AddItem from "./Pages/AddItem/AddItem";
import { AuthGuard } from "./AuthGuard";
import ReceivedOrders from "./Pages/ReceivedOrders/ReceivedOrders";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/main" />} />
          <Route path="/businessRegister" element={<BusinessRegisterPage />} />
          <Route path="/businessLocation" element={<BusinessLocationPage />} />
          <Route path="/businessWelcome" element={<BusinessWelcome />} />
          <Route path="/businessLogin" element={<BusinessLoginPage />} />
          <Route path="/businessComment" element={<BusinessCommentPage />} />
          <Route element={<AuthGuard />}>
            <Route path="/main" element={<MainPage />} />{" "}
            <Route path="/MenuPreview" element={<MenuPreview />} />
            <Route
              path="/ShopOpenTime"
              element={<BusinessChooseShopOpenTime />}
            />
            <Route path="/receivedOrders" element={<ReceivedOrders />} />
            <Route path="/AllItem" element={<AllItem />} />
            <Route path="/MainAddItem/:itemId" element={<MainAddItem />} />
            <Route path="/PromotionInfo" element={<PromotionInfo />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
