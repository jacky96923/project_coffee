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

import { RootState } from "./store";
import { useSelector } from "react-redux";
import ShopSelection from "./Pages/shopSelection/ShopSelection";
import ProductSelection from "./Pages/productSelection/ProductSelection";
import ItemPage from "./Pages/items/ItemPage";
import Receipt from "./Pages/receipt/ReceiptPage";
import AllReceipt from "./Pages/receipt/AllReceiptPage";

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
              element={<ProductSelection />}
            />
            <Route path="/itemPage" element={<ItemPage />} />

            <Route path="/CommentPage" element={<CommentPage />} />
            <Route path="/shopping-cart" element={<ShoppingCartPage />} />
            <Route path="/receipt/temp" element={<Receipt/>}/>
            <Route path="/receipt/all" element={<AllReceipt/>}/>
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
