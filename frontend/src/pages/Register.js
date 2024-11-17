import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "SMA_Register");
    data.append("cloud_name", "dapajcd1d");

    try {
      if (image === null) {
        return error.message;
      }

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dapajcd1d/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const cloudData = await res.json();


      const register = { username, email, password, profilePic: cloudData.url, bio };
      const response = await fetch("/api/user/register", {
        method: "POST",
        body: JSON.stringify(register),
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
        alert(error);
      }
      if (response.ok) {
        setUsername("");
        setEmail("");
        setPassword("");
        setBio("");
        setError(null);
        console.log("new user added ", json);
        window.location.href = "/login";
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <div className="Reg d-flex justify-content-center my-5 mx-5">
      <form className="form-reg " onSubmit={handleSubmit}>
        <h2 style={{ color: "whitesmoke" }}>Registeration Form:</h2>

        <div style={{ color: "white" }}>
          <label>Upload Profile Pic:</label>
          <input
            className="my-1"
            type="file"
            accept="image/*"
            style={{ borderRadius: "10px", padding: "5px" }}
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <>
          <div>
            <input
              className="my-1"
              type="text"
              placeholder="Enter Your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ borderRadius: "10px", padding: "5px", width: "300px" }}
            />
          </div>
          <div>
            <input
              className="my-1"
              type="text"
              placeholder="Enter Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderRadius: "10px", padding: "5px", width: "300px" }}
            />
          </div>
          <div>
            <input
              className="my-1"
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderRadius: "10px", padding: "5px", width: "300px" }}
            />
          </div>
          <div>
            <input
              className="my-1"
              type="text"
              placeholder="Enter Your Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              style={{ borderRadius: "10px", padding: "5px", width: "300px" }}
            />
          </div>

          <div>
            <input
              className="btn btn-primary my-2"
              style={{ borderRadius: "10px", padding: "5px" }}
              type="submit"
              value="Submit"
            />
            <Link to="/login" className="mx-2" style={{ color: "whitesmoke" }}>
              Already have an Account
            </Link>
          </div>
        </>
      </form>
    </div>
  );
}
