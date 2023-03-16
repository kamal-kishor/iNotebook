import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = (props) => {
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let history = useHistory();

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const { name, email, password } = credential;
    const response = await fetch("http://localhost:3030/api/auth/createuser", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credential.name,
        password: credential.password,
        email: credential.email,
      }),
    });

    //AuthToken Generate
    const json = await response.json();
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authotoken);
      history.push("/");
      props.showAlert = ("Account Created successfully", "Success");
    } else {
      props.showAlert = ("invalid Details", "danger");
    }

    // if (e.target.password === e.target.cpassword) {
    //   console.log("Success msg");
    // } else {
    //   alert("Match the password");
    // }
  };
  return (
    <div>
      <form className="my-3" onSubmit={handleClick}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Emaiil
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            required
            min-islength={4}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            conform Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
            required
            min-islength={4}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
        {/* <i className="fa-solid fa-paper-plane-top"></i> */}
      </form>
    </div>
  );
};

export default Signup;
