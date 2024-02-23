import React, { useState , useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "./store";
import { part_one_data } from "./slices/RegSlice";

export default function BusinessLoginPage() {
  const login_name = useSelector((state: RootState) => state.reg.login_name);
  const shop_name = useSelector((state: RootState) => state.reg.shop_name);
  const contact_no = useSelector((state: RootState) => state.reg.contact_no);
  const login_password = useSelector(
    (state: RootState) => state.reg.login_password
  );

  const [loginName, setLoginName] = useState(login_name);
  const [shopName, setShopName] = useState(shop_name);
  const [Telnum, setTelnum] = useState<string>(contact_no ? contact_no.toString() : "");
  const [password, setPassword] = useState(login_password);
  const [confirmPassword, setConfirmPassword] = useState(login_password);

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const handleLoginNameChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setLoginName(e.target.value);
  };

  const handleShopNameChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setShopName(e.target.value);
  };

  const handleTelnumChange = (e: { target: any }) => {
    setTelnum(e.target.value);
  };

  const handlePasswordChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("密碼與確認密碼不相符！");
    } else if (!Telnum || isNaN(parseInt(Telnum)) || Telnum.length !== 8) {
      alert("請輸入有效的八位電話號碼。");
    } else {
      // Save form data to local storage
      const formData = {
        shopName,
        Telnum,
        password,
      };

      dispatch(
        part_one_data({
          login_name: loginName,
          shop_name: shopName,
          contact_no: parseInt(Telnum),
          login_password: password,
        })
      );

      // Navigate to the next page
      navigate("/BusinessLocation");
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h4 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            註冊你的咖啡店
          </h4>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="shopName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                登入名稱
              </label>
              <div className="mt-2">
                <input
                  id="LoginName"
                  name="LoginName"
                  type="text"
                  autoComplete="LoginName"
                  required
                  value={loginName}
                  onChange={handleLoginNameChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="shopName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                店舖名稱
              </label>
              <div className="mt-2">
                <input
                  id="shopName"
                  name="shopName"
                  type="text"
                  autoComplete="shop-name"
                  required
                  value={shopName}
                  onChange={handleShopNameChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="Telnum"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                聯繫電話
              </label>
              <div className="mt-2">
                <input
                  id="Telnum"
                  name="Telnum"
                  type="text"
                  autoComplete="off"
                  required
                  value={Telnum}
                  onChange={handleTelnumChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                密碼
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                確認密碼
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #CB8A58, #562B1A)",
                  borderColor: "transparent",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundImage =
                    "linear-gradient(to right, #B07A4E, #4A2416)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundImage =
                    "linear-gradient(to right, #CB8A58, #562B1A)")
                }
              >
                下一步
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
