import { FormEvent, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { login } from "../../slices/authSlice";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";

// import styles from "./ClientLoginPage.module.css";

const source = "http://localhost:8100";

export async function postLogin(username: string, password: string) {
  const res = await fetch(`${source}/auth/userLogin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const resp = await res.json();

  // on receive token,save in localStorage

  if (resp.message === "success") {
    localStorage.setItem("token", resp.token);

    return true;
  } else return false;
}

export default function ClientLoginPage() {
  const dispatch = useDispatch<AppDispatch>();

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const handleLogin = async (
    e: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    let result = await postLogin(usernameInput, passwordInput);
    if (result) {
      let decoded: { user_id: number; username: string } = jwtDecode(
        localStorage.getItem("token")!
      );
      dispatch(login(decoded.username));
    }

    console.log("username", usernameInput);
    console.log("password", passwordInput);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            歡迎來到 ProjectCoffee{" "}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                用戶名稱{" "}
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setUsernameInput(e.target.value);
                  }}
                  value={usernameInput}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  密碼
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    忘記密碼{" "}
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                  }}
                  value={passwordInput}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleLogin}
              >
                登入{" "}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            還未成為會員？{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              申請帳號{" "}
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
