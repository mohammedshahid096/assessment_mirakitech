import React, { useEffect, useState } from "react";
import "../Styles/account.scss";
import { Typography, TextField, Button, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ToastError } from "../Components/AlertPops/AlertPop";
import { useDispatch, useSelector } from "react-redux";
import {
  userClearErrorsAction,
  LoginAction,
} from "../ReduxImplement/Action/user.action";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.User
  );

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  // todo : Login Submit handler
  /*
   * when ever will click to submit button
   * it will call the login Action
   * login credentials like email and password
   */
  const onSubmitLoginHandler = () => {
    if (email === "" || password === "") {
      ToastError("Enter the Fields");
      return;
    } else {
      dispatch(LoginAction(email, password));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      ToastError(error);
      dispatch(userClearErrorsAction());
    }
  }, [dispatch, navigate, isAuthenticated, error]);

  return (
    <div className="bgWrapper">
      <div className="bgWhiteBox loginWrapper">
        <Typography variant="h4" component="h2">
          Login to your account
        </Typography>

        <form>
          <div className="inputLabelClass">
            <Typography variant="h6">Email</Typography>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Enter the email"
              type="email"
              onChange={(e) => setemail(e.target.value)}
            />
          </div>

          <div className="inputLabelClass">
            <Typography variant="h6">Password</Typography>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Enter the password"
              type="password"
              autoComplete="on"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>

          <div className="rememberDiv">
            <input type="checkbox" /> <span>Remember Me</span>
          </div>

          <div className="bgButtonBlue">
            {loading ? (
              <CircularProgress color="success" />
            ) : (
              <Button
                variant="contained"
                fullWidth
                className="bgButtonBlue"
                onClick={onSubmitLoginHandler}
              >
                Login
              </Button>
            )}
          </div>
        </form>

        {loading ? null : (
          <div className="AlreadyPresent">
            <Typography>
              New to MyApp? <Link to="/register">Sign Up</Link>{" "}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
