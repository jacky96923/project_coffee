import React, { useEffect, useState } from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import ShoppingCartPage from "./Pages/shoppingCart/ShoppingCartPage";
import ClientLoginPage from "./Pages/login/LoginPage";
import ClientRegisterPage from "./Pages/register/RegisterPage";
import ClientMainPage from "./Pages/main/MainPage";
import { CommentPage } from "./Pages/comments/CommentPage";
import { CommentSummary } from "./Pages/comments/CommentSummary";
import { RootState } from "./store";
import { useSelector } from "react-redux";
import ShopSelection from "./Pages/shopSelection/ShopSelection";
import Menu from "./Pages/menu/Menu";
import MyReward from "./Pages/myReward/MyReward";
import MyPage from "./Pages/myPage/MyPage";
import Receipt from "./Pages/receipt/ReceiptPage";
import AllReceipt from "./Pages/receipt/AllReceiptPage";
import ItemPage from "./Pages/items/itemPage";
import { AuthGuard } from "./AuthGuard";
import CheckoutCancel from "./Pages/shoppingCart/CheckoutCancel";
import { CartGuard } from "./CartGuard";
import BottomNavBar from "./components/BottomNavBar";

function App() {
  // const hideNavBarRoutes = ['/itemPage/'];
  // const [currentPath, setCurrentPath] = useState("");
  // const [shouldHideNavBar, setShouldHideNavBar] = useState(false)
  // if (currentPath !== window.location.pathname){
  //   setCurrentPath(window.location.pathname)
  // }
  
  // useEffect(()=>{
  //   if (hideNavBarRoutes.some(route => {
  //   if (route.endsWith('/')) {
  //     return currentPath.startsWith(route);
  //   } else {
  //     return currentPath === route;
  //   }
  //   })) {
  //     setShouldHideNavBar(true)
  //   } else {
  //     setShouldHideNavBar(false)
  //   }
  // }, [currentPath])
  // console.log("shouldHideNavBar", shouldHideNavBar)

  return (
  <Router>
    <div className="App mb-20">
      <Routes>
        <Route path="/" element={<Navigate to="/main"></Navigate>} />
        <Route path="/client-login" element={<ClientLoginPage />} />
        <Route path="/client-register" element={<ClientRegisterPage />} />
        <Route path="/main" element={<ClientMainPage />} />
        <Route path="/shopSelection" element={<ShopSelection />} />
        <Route path="/myReward" element={<MyReward />} />
        <Route
          path="/menu/:shopId"
          element={<Menu />}
        />
        <Route path="/itemPage/:id" element={<ItemPage />} />
        <Route element={<CartGuard/>}>
          <Route path="/shoppingCart" element={<ShoppingCartPage />} />
        </Route>

        <Route element={<AuthGuard />}>
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/receipt/all" element={<AllReceipt />} />
          <Route path="/receipt/:transactionId" element={<Receipt />} />
          <Route path="/comment/:transactionId" element={<CommentPage />} />
          <Route path="/commentSummary" element={<CommentSummary />} />
          {/* <Route path="/checkoutCancel" element={<CheckoutCancel />} /> */}
        </Route>
      </Routes>
    </div>
    {/* {!shouldHideNavBar && <BottomNavBar/>} */}
    <BottomNavBar/>
  </Router>
  );
}

export default App;
