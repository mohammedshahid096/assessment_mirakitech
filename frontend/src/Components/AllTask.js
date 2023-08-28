import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  CircularProgress,
  Box,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteTaskAction,
  GetAllTasksAction,
  UpdateTaskAction,
  tasklearErrorsAction,
} from "../ReduxImplement/Action/todo.action";
import SpeakerNotesOffIcon from "@mui/icons-material/SpeakerNotesOff";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { ToastError } from "./AlertPops/AlertPop";
import {
  DELETE_TASK_RESET,
  TASK_ID,
  UPDATE_TASK_RESET,
} from "../ReduxImplement/Constant/todo.constant";
import UpdateTask from "./UpdateTask";

const AllTask = () => {
  const dispatch = useDispatch();
  const { loading, tasks } = useSelector((state) => state.TaskData);
  const {
    loading: l1,
    isUpdated,
    isDeleted,
    error,
  } = useSelector((state) => state.TaskOperations);

  const [updateTodo, setupdateTodo] = useState(false);
  // const [taskid, settaskid] = useState("");

  const OpenEditBox = (id) => {
    setupdateTodo(true);
    dispatch({ type: TASK_ID, payload: id });
  };

  const updateTaskHandler = (id) => {
    dispatch(UpdateTaskAction({ isCompleted: true }, id));
  };

  const DeleteTaskHandler = (id) => {
    dispatch(DeleteTaskAction(id));
  };
  useEffect(() => {
    if (error) {
      ToastError(error);
      dispatch(tasklearErrorsAction());
    }
    if (isUpdated) {
      dispatch({ type: UPDATE_TASK_RESET });
    }
    if (isDeleted) {
      dispatch({ type: DELETE_TASK_RESET });
    }
    dispatch(GetAllTasksAction());
  }, [dispatch, isUpdated, error, isDeleted]);

  return loading || l1 ? (
    <Box style={{ marginTop: "20px" }}>
      <CircularProgress />
    </Box>
  ) : (
    <>
      <div className="AllTaskWrapper">
        {tasks && tasks.length === 0 ? (
          <div className="noTasks">
            <SpeakerNotesOffIcon />
            <br />
            No Task Avialable
          </div>
        ) : (
          tasks.map((item) => (
            <div key={item._id}>
              <div>
                <Typography variant="h5">{item.title}</Typography>
                <Typography>{item.description}</Typography>
              </div>
              <div>
                {item.isCompleted ? (
                  <>
                    <IconButton
                      color="warning"
                      onClick={() => OpenEditBox(item._id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => DeleteTaskHandler(item._id)}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                    endIcon={<BookmarkAddedIcon />}
                    onClick={() => updateTaskHandler(item._id)}
                  >
                    comopletd
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {tasks.length !== 0 && (
        <UpdateTask open={updateTodo} setopen={setupdateTodo} />
      )}
    </>
  );
};

export default AllTask;
