import React from "react";
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
import { CommentPage } from "./Pages/Comments/CommentPage";
import { CommentSummary } from "./Pages/Comments/CommentSummary";
import { RootState } from "./store";
import { useSelector } from "react-redux";
import ShopSelection from "./Pages/shopSelection/ShopSelection";
import ProductSelection from "./Pages/productSelection/ProductSelection";
import MyReward from "./Pages/myReward/MyReward";
import MyPage from "./Pages/myPage/MyPage";
import Receipt from "./Pages/receipt/ReceiptPage";
import AllReceipt from "./Pages/receipt/AllReceiptPage";
import ItemPage from "./Pages/items/itemPage";
import { AuthGuard } from "./AuthGuard";
import CheckoutCancel from "./Pages/shoppingCart/CheckoutCancel";

function App() {
  const user = useSelector<RootState>((state) => state.auth.user);
  return (
    <>
      <Router>
        <div className="App ">
          <Routes>
            <Route path="/" element={<Navigate to="/main"></Navigate>} />
            <Route path="/client-login" element={<ClientLoginPage />} />
            <Route path="/client-register" element={<ClientRegisterPage />} />
            <Route path="/main" element={<ClientMainPage />} />
            <Route path="/shopSelection" element={<ShopSelection />} />
            <Route path="/myReward" element={<MyReward />} />

            <Route
              path="/productSelection/:shopId"
              element={<ProductSelection />}
            />
            <Route path="/itemPage/:id" element={<ItemPage />} />
            <Route path="/CheckoutCancel" element={<CheckoutCancel />} />

            <Route path="/CommentPage" element={<CommentPage />} />
            <Route path="/CommentSummary" element={<CommentSummary />} />
            <Route path="/shopping-cart" element={<ShoppingCartPage />} />
            <Route element={<AuthGuard />}>
              <Route path="/myPage" element={<MyPage />} />
              <Route path="/receipt/temp" element={<Receipt />} />
              <Route path="/receipt/all" element={<AllReceipt />} />
              {/* <Route path='/checkout-success' element={<Home />} />
              <Route path='/checkout-cancel' element={<AboutPage />} /> */}
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

// function ProductSelectionWrapper({ match }: any) {
//   const { shopId } = match.params;
//   return <ProductSelection shopId={parseInt(shopId)} />;
// }

export default App;
