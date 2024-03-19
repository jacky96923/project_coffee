import { FormEvent, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { login } from "../../slices/authSlice";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";

// const source = process.env.REACT_APP_API_SERVER;
const source = "http://localhost:8100";

export async function postRegister(
  username: string,
  email: string,
  contactNo: string,
  password: string,
  confirmPassword: string
) {
  const res = await fetch(`${source}/auth/userRegister`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      contactNo,
      password,
      confirmPassword,
    }),
  });

  const resp = await res.json();

  // on receive token,save in localStorage

  if (resp.message === "success") {
    localStorage.setItem("token", resp.token);

    return true;
  } else return false;
}

export default function RegisterPage() {
  const dispatch = useDispatch<AppDispatch>();

  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const result = await postRegister(
      usernameInput,
      emailInput,
      phoneInput,
      passwordInput,
      confirmPasswordInput
    );

    if (result) {
      let decoded: { user_id: number; username: string; type: string } =
        jwtDecode(localStorage.getItem("token")!);
      dispatch(
        login({
          user: decoded.username,
          user_id: decoded.user_id,
          type: decoded.type,
        })
      );
      window.location.href = "/";
    }
  };

  return (
    <>
      <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            註冊你的帳號{" "}
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            請填寫以下資料{" "}
          </p>
        </div>
        <form
          action="#"
          method="POST"
          className="mx-auto mt-16 max-w-xl sm:mt-20"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                使用者名稱*
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="username"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setUsernameInput(e.target.value);
                  }}
                  value={usernameInput}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                電郵地址*
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                  }}
                  value={emailInput}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                流動電話號碼
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="contactNo"
                  id="contactNo"
                  autoComplete="contactNo"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setPhoneInput(e.target.value);
                  }}
                  value={phoneInput}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                密碼*
              </label>
              <div className="mt-2.5">
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="password"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                  }}
                  value={passwordInput}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                確認密碼*
              </label>
              <div className="mt-2.5">
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  autoComplete="confirmPassword"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setConfirmPasswordInput(e.target.value);
                  }}
                  value={confirmPasswordInput}
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-green-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              onClick={handleSubmit}
            >
              提交{" "}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
