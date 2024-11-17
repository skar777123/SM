import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const HandleSubmit = async (e) => {
    e.preventDefault();

    const login = { email, password };

    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify(login),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      console.log(error);
    }
    if (response.ok) {
      setEmail("");
      setPassword("");
      setError(null);
      console.log("User verified", json);
      localStorage.setItem("token", json.token);
      window.location.href = "/homePost";
    }
  };

  return (
    <div className="Reg d-flex justify-content-center my-5">
      <form className="form-reg" onSubmit={HandleSubmit}>
        <h2 style={{ color: "whitesmoke" }}>Login:</h2>

        <div>
          <input
            type="text"
            placeholder="Enter Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ borderRadius: "10px", padding: "5px" }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ borderRadius: "10px", padding: "5px" }}
          />
        </div>

        <div>
          <input
            className="btn btn-primary my-2"
            style={{ borderRadius: "10px", padding: "5px" }}
            type="submit"
            value="Submit"
          />
          <Link to="/register" className="mx-2" style={{color:"whitesmoke"}}>Create an Account</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
