import { FormEvent, useState } from "react";

export default function BussinessLoginPage() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("username", usernameInput);
    console.log("password", passwordInput);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <h1>Project Coffee</h1>
          <h3>Input your bussiness information</h3>
          <input
            type="text"
            name=""
            id=""
            placeholder="Username"
            onChange={(e) => {
              setUsernameInput(e.target.value);
            }}
            value={usernameInput}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPasswordInput(e.target.value);
            }}
            value={passwordInput}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPasswordInput(e.target.value);
            }}
            value={passwordInput}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPasswordInput(e.target.value);
            }}
            value={passwordInput}
          />
        </form>
      </div>
    </>
  );
}
