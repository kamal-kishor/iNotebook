import React, { useState } from "react";
import { useHistory } from "react-router-dom";
const Login = (props) => {
  const [credential, setCredential] = useState({ email: "", password: "" });
  let history = useHistory();

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3030/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "auth-token":
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwYWJmMzBmMjE3MTE4ZTBiN2U5OWE3In0sImlhdCI6MTY3ODk0NDg5MH0.qDKmcyEZ1ydSSzHRSKqUQbdyvXnIegu6VA8oYU8X-i4",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authotoken);
      history.push("/");

      props.showAlert = ("LogedIn successfully", "Success");
    } else {
      props.showAlert = ("invalid Credentialss", "danger");
    }
  };
  return (
    <div>
      <form className="my-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credential.email}
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            we'll never share credential's with anyone else
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credential.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        {/* <i className="fa-solid fa-paper-plane-top"></i> */}
      </form>
    </div>
  );
};

export default Login;
