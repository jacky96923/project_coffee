import { FormEvent, useState } from "react";
import styles from "./ClientLoginPage.module.css";

export default function ClientLoginPage() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("username", usernameInput);
    console.log("password", passwordInput);
  };

  return (
    <>
      <div className={styles.clientForm}>
        <div className={styles.content}>
          <h1>登入</h1>
          <h3>Please input your username and password</h3>
          <div className={styles.loginDetail}>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name=""
                id=""
                placeholder="帳號"
                onChange={(e) => {
                  setUsernameInput(e.target.value);
                }}
                value={usernameInput}
              />
              <br />
              <br />
              <input
                type="password"
                placeholder="密碼"
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                }}
                value={passwordInput}
              />
              <br />
              <br />
              <button>Login</button>
            </form>
          </div>
          <h6>New to CoffeeProject?</h6>
          <button>Create a new account</button>
        </div>
      </div>
    </>
  );
}
