import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Typography, SpeedDial, SpeedDialAction } from "@mui/material";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import { LogoutAction } from "../ReduxImplement/Action/user.action";
import "../Styles/home.scss";
import CreateModel from "../Components/CreateModel";
import AllTask from "../Components/AllTask";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.User);

  const [createTodo, setcreateTodo] = useState(false);

  // todo: logout function
  function logoutFunction() {
    dispatch(LogoutAction());
  }

  // todo : Add todo function
  /**  with this function
   * add todo model component will be pop
   * so createtodo state will be get true
   */
  function AddTodo() {
    setcreateTodo(true);
  }

  const actions = [
    { icon: <NoteAddIcon />, name: "Create", func: AddTodo },
    { icon: <LogoutIcon />, name: "logout", func: logoutFunction },
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);
  return (
    <>
      <div className="bgWrapper homeWrapper">
        <div className="inputWrapper">
          <div>
            <Typography variant="h3">Task List</Typography>
          </div>
        </div>
        {/* in this component all the tasks will be displayed */}
        <AllTask />
      </div>

      {/* Speed Dial  */}
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 20 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={action.func}
          />
        ))}
      </SpeedDial>

      {/* Model for adding a new task */}
      <CreateModel open={createTodo} setopen={setcreateTodo} />
    </>
  );
};

export default Home;
