import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import styles from "./BusinessLoginPage.module.css";
import { jwtDecode } from "jwt-decode";

const source = "http://localhost:8100";

export async function postLogin(username: string, password: string) {
  try {
    const response = await fetch(`${source}/business/auth/businessLogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    console.log("Success:", data);

    if (data.token) {
      localStorage.setItem("token", data.token);
      return data; // Return the full data object including the token
    } else {
      throw new Error(data.message || "Login failed");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export default function BusinessLoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // if (result) {
      //   let decoded: { id: number; username: string, type: string } = jwtDecode(
      //     localStorage.getItem("token")!
      //   );
      //   dispatch(login({user: decoded.username, user_id: decoded.id, type: decoded.type}));
      //   navigate("/main")
      // } 
      const data = await postLogin(usernameInput, passwordInput);
      if (data){
        console.log("Login successful:", data);
        let decoded: { id: number; username: string, type: string } = jwtDecode(
          localStorage.getItem("token")!
        );
        dispatch(login({shop: decoded.username, shop_id: decoded.id, type: decoded.type}));
      //   navigate("/main")
      }

      // Dispatch the login action with the received data
      dispatch(login(data));

      // Redirect the user to the profile page using useNavigate
      console.log("Attempting to navigate to /profile...");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      alert(error); // Show an alert if there is an error
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-left text-3xl font-extrabold text-gray-900">
            Project Coffee
          </h2>
          <h2 className="mt-6 text-left text-1xl font text-gray-900">商業</h2>
          <h2 className="mt-6 text-left text-1xl font text-gray-400">登入</h2>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <h2 className="mt-6 text-left text-1xl font text-gray-900">
                  店舖名稱
                </h2>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <h2 className="mt-6 text-left text-1xl font text-gray-900">
                  密碼
                </h2>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="mt-6">
                <Link
                  to="/BusinessRegister"
                  className="font-medium "
                >
                  新商戶登記
                </Link>
              </div>
              <button
                type="submit"
                className="group relative w-full flex justify-center mt-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                style={{ 
                  backgroundImage: "linear-gradient(to right, #CB8A58, #562B1A)",
                  borderColor: "transparent"
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundImage = "linear-gradient(to right, #B07A4E, #4A2416)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundImage = "linear-gradient(to right, #CB8A58, #562B1A)")}
              
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
