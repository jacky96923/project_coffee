import { FormEvent, useState } from "react";

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
      <div>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <h3>Please input your username and password</h3>
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
          <button>Login</button>
          <h6>New to xxxxxxxx?</h6>
          <button>Create a new account</button>
        </form>
      </div>
    </>
  );
}
