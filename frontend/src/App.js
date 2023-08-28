import React, { useEffect } from "react";
import webfont from "webfontloader";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoadUserAction } from "./ReduxImplement/Action/user.action";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Login from "./Pages/Login";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // todo: loading a fonts
    webfont.load({
      google: {
        families: ["Roboto", "Poppins"],
      },
    });

    // todo: load user function
    /**
     * when ever the page is load then load user function will be called
     **/
    dispatch(LoadUserAction());
  });
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </div>
  );
}

export default App;
