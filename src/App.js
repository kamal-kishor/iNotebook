import React, { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Alert from "./components/Alert";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NoteState from "./contextapi/notes/NoteState";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  return (
    <>
      <NoteState>
        <Router>
          <NavBar />
          <Alert alert={alert} />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home showAlert={showAlert} />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login showAlert={showAlert} />
              </Route>
              <Route exact path="/signup">
                <Signup showAlert={showAlert} />
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
