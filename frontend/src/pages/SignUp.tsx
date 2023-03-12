import React, { useState } from "react";

type CustomTextFieldProps = {
  label: string;
  name: string;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <form className="flex flex-col justify-center items-center">
        <input
          value={fullName}
          className="p-input"
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full name"
          type="text"
          name="firstName"
          required
        />
        <input
          type="text"
          className="p-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          type="email"
          className="p-input"
          name="email"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-input"
          type="password"
          name="password"
          required
        />
        <button type="submit" className="p-btn">
          Submit
        </button>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700">
            Username
          </span>
        </label>
      </form>
    </div>
  );
};

export default SignUp;
