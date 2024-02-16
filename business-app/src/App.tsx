import "./App.css";

import { Route, Routes, Navigate } from "react-router-dom";
import BusinessLoginPage from "./BusinessLoginPage";
import BusinessRegisterPage from "./BusinessRegisterPage";
import BusinessLocation from "./BusinessLocationPage";
import LoginokPage from "./LoginokPage";
import { BusinessChooseShopOpenTime } from "./BusinessChooseShopOpenTime";

import { RootState } from "./store";
import { useSelector } from "react-redux";
function App() {
  const user = useSelector<RootState>((state) => state.auth.user);
  return (
    
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/BusinessLogin" />} />
          <Route path="/BusinessLogin" element={user? <LoginokPage/>: <BusinessLoginPage />}></Route>
          <Route path="/BusinessRegister" element={<BusinessRegisterPage />} />
          <Route path="/BusinessLocation" element={<BusinessLocation />} />
          <Route path="/ShopOpenTime" element={<BusinessChooseShopOpenTime />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
