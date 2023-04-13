import React, { useState } from "react";
import "./Login.css"; // import external CSS file

function LoginForm({ setlogin, settoken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit form data to server or perform other actions
  };

  const onsubmit = () => {
    if (email === "arsalan@gmail.com" && password === "1234") {
      settoken("Arsalan");
    }
    if (email === "faizaan@gmail.com" && password === "5678") {
      settoken("Faizaan");
    }
  };

  return (
    <div>
      <div className="welcome-text">
        <h1>Hey! Welcome Back</h1>
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button type="submit" onClick={onsubmit}>
          Log in
        </button>
      </form>
      <div className="option">
        Dont have an account
        <button
          type="button"
          onClick={() => {
            setlogin(false);
          }}
          className="sign-up"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
