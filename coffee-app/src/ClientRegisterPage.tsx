import { FormEvent, useState } from "react";
import styles from "./ClientRegisterPage.module.css";

export default function ClientLoginPage() {
  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("username", usernameInput);
    console.log("email", emailInput);
    console.log("phone", phoneInput);
    console.log("password", passwordInput);
  };

  return (
    <>
      <div className={styles.clientForm}>
        <div className={styles.content}>
          <h1>註冊你的帳號</h1>
          <h4>請填寫以下資料</h4>
          <h5>使用者名稱*</h5>
          <div className={styles.RegisterDetail}>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name=""
                id=""
                onChange={(e) => {
                  setUsernameInput(e.target.value);
                }}
                value={usernameInput}
              />
              <h5>電郵地址*</h5>
              <input
                type="text"
                onChange={(e) => {
                  setEmailInput(e.target.value);
                }}
                value={emailInput}
              />
              <h5>流動電話號碼</h5>
              <input
                type="text"
                onChange={(e) => {
                  setPhoneInput(e.target.value);
                }}
                value={phoneInput}
              />
              <h5>密碼*</h5>
              <input
                type="password"
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                }}
                value={passwordInput}
              />
              <h1></h1>
              <button>提交</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
